const logger = require('heroku-logger');
const log = require('debug')('api:user');
const user_model = require('../../../models/user');
const db_model = require('../../../models/db_model');
const config = require('../../../config/');
const issueToken = require('../../../utils/issuer');
const { generate } = require('../../../utils/token');
const sign_in_check = require('./sign_in_check');
const {
    runResendConfirmEmailTask,
    runVerifyEmailTask,
    runResetPasswordTask,
    runStartInvitesDurationTask,
    runUpdateEmailPrefsTask,
    runCloseAccount,
} = require('../../bl');

const something_wrong = (req, e) => req.res.status(500).send({ message: 'Something went wrong', message_code: '500', error: `${e}` }); //e.stack
const login_response = (req, res) => {
    log('login_response | isAuthenticated: ', req.isAuthenticated());
    const {user} = req;
    log('login_response | user.remember_me_token: ', user.remember_me_token);
    log('login_response | user.email: ', user.email);
    res
        .cookie('remember_me', user.remember_me_token, config.cookie())
        .status(200)
        .json({ token: user.remember_me_token, data: user });
};

const logout = (req, res, next) => {
    res.clearCookie('remember_me');
    req.logout();
    res.status(200).json({ message: 'logout', message_code: 'logout' });
};

const remember_me = async (db, cacheClient, req, res, notFoundResp) => {
    try {
        const User = db_model('users', db.pool, cacheClient);
        const token = req.cookies.remember_me;
        const user = await User.find_by({ remember_me_token: token }, { get_fields: 'for_sign_in' });
        log('rememberMe:user:', JSON.stringify(user).substring(0, 300));
        if (!user) return notFoundResp();
        // user.for_remember_me = true;
        sign_in_check(req, db, cacheClient, user, (e, upd_user) => {
            log('rememberMe:upd_user:', JSON.stringify(upd_user).substring(0, 300));
            req.login(upd_user, (e) => {
                if (e) return something_wrong(req, e);
                login_response(req, res)
            })
        });
    } catch (e) { something_wrong(req, e) }
};

module.exports = {
    login_response,
    logout,

    register: (req, res) => {
        if (req.user.status === 'pending') return login_response(req, res);
        res.status(200).json({ message: 'User was successfully created.', message_code: 'user_created' });
    },
    rememberMe: (db, cacheClient) => async (req, res, next) => {
        const notFoundResp = () => res.status(422).json({ message: 'Token not found', message_code:'invalid_token' });
        await remember_me(db, cacheClient, req, res, notFoundResp);
    },
    resendEmailConfirmation: (db, cacheClient) => async (req, res) => {
        try {
            const User = db_model('users', db, cacheClient);
            log('resendEmailConfirmation:req.body:', JSON.stringify(req.body));
            const email = req.body.email.toLowerCase();
            const user = await User.find_by({email});
            log('resendEmailConfirmation:user:', JSON.stringify(user).substring(0, 300));
            if (!user) return res.status(404).json({
                message: `Can not find user with email ${email}`, message_code: 'user_email_not_found'
            });
            if (user.status !== 'new' || user.confirmed_at) return res.status(422).json({
                message: `User account already confirmed.`, message_code: 'user_already_confirmed'
            });

            await runResendConfirmEmailTask({id: user.id, email}, db.pool, cacheClient);
            res.status(200).json({
                message: 'You will receive an email with instructions for how to confirm your email address in a few minutes.',
                message_code: 'user_send_confirm_instructions'
            });
        } catch (e) {
            something_wrong(req, e)
        }
    },
    confirmEmail: (db, cacheClient) => async (req, res) => {
        try {
            log('confirmEmail:req.body:', req.body);
            const User = db_model('users', db, cacheClient);
            const { token, verification_code } = req.body;
            const email = req.body.email.toLowerCase();
            const user = await User.find_by({
                query: 'WHERE email = $1 OR confirmation_token = $2',
                query_values: [email, token]
            }, { with_fields: 'email_verification_code, confirmation_token' });

            log('confirmEmail:user:', JSON.stringify(user).substring(0, 300));
            if (!user) {
                return res.status(404).json({ message: `Token is invalid or expired.`, message_code: 'invalid_token' });
            }
            if (user.status === 'deleted') {
                return res.status(422).json({ message: `Sorry, this invite is no longer valid.`, message_code: 'user_rejected' });
            }
            if (user.status !== 'new' || user.confirmed_at) {
                return res.status(422).json({ message: `User account already confirmed.`, message_code: 'user_already_confirmed' });
            }
            if (user.email_verification_code !== `${verification_code}` && (!token || user.confirmation_token !== `${token}`)) {
                return res.status(422).json({ message: `Sorry, wrong email confirmation code.`, message_code: 'invalid_verif_code' });
            }

            issueToken({ email: user.email, created_at: +new Date() }, async (err, authToken) => {
                try {
                    const upd_user = await runVerifyEmailTask({
                        email: user.email, remember_me_token: authToken, ip: req.clientIp
                    }, db.pool, cacheClient);
                    log('upd_user from task: ', JSON.stringify(upd_user).substring(0, 300));
                    req.login(upd_user, (e) => {
                        if (e) return something_wrong(req, e);
                        login_response(req, res)
                    })
                } catch (e) { something_wrong(req, e) }
            });
        } catch (e) { something_wrong(req, e) }
    },
    transactions: (db, cacheClient) => (req, res, next) => {},
    dashboard: function(req, res) {
        const { user } = req;

        return res.status(200).json(user);
    },
    resetPassword: (db, cacheClient) => async (req, res) => {
        try {
            const User = db_model('users', db, cacheClient);
            log('resetPassword:req.body:', JSON.stringify(req.body));
            const email = req.body.email.toLowerCase();
            const user = await User.find_by({email});
            log('resetPassword:user:', JSON.stringify(user).substring(0, 300));
            if (!user) return res.status(404).json({
                message: `Can not find user with email ${email}`, message_code: 'user_email_not_found'
            });
            await runResetPasswordTask({id: user.id}, db.pool, cacheClient);
            res.status(200).json({
                message: 'You will receive an email with instructions on how to reset your password in a few minutes.',
                message_code: 'user_send_reset_pass_instructions'
            });
        } catch (e) { something_wrong(req, e) }
    },
    mailPrefs: (db, cacheClient) => (req, res) => {
        const User = db_model('users', db, cacheClient);
        const { token, email } = req.query;

        User.find_by({ email: email.toLowerCase() }, { extra_data: false })
            .then(response => {
                if (response) {
                    generate({ email_subscription: response.email_subscription, email: response.email }, (err, compareToken) => {
                        if (compareToken === token) res.status(200).json({ email_prefs: response.email_subscription, token: compareToken });
                        else res.status(422).json({ message: 'Email preferences token is invalid', message_code: 'invalid_email_prefs_token' });
                    });
                } else {
                    res.status(404).json({ message: 'Record Not Found.', message_code: 'user_email_not_found' });
                }
            })
            .catch(error => res.status(500).json({ message: 'sorry something went wrong.', message_code: '500' }));
    },
    updateMailPrefs: (db, cacheClient) => async (req, res) => {
        try {
            log('updateMailPrefs:req.body:', JSON.stringify(req.body));
            const email = req.body.email.toLowerCase();
            const User = db_model('users', db.pool, cacheClient);
            const user = await User.find_by({ email }, { extra_data: false });
            log('updateMailPrefs:user:', JSON.stringify(user).substring(0, 300));
            if (!user) return res.status(404).json({
                message: 'Record Not Found.', message_code: 'user_email_not_found'
            });
            const { new_prefs, token } = req.body;
            if (token !== generate({ email_subscription: response.email_subscription, email })) return res.status(422).json({
                message: 'Email preferences token is invalid', message_code: 'invalid_email_prefs_token'
            });

            await runUpdateEmailPrefsTask({ id: user.id, email_subscription: new_prefs }, db.pool, cacheClient);
            const newToken = generate({ email_subscription: new_prefs, email });
            res.status(200).json({
                token: newToken, message: 'Email preferences has been updated successfully.', message_code: 'user_email_prefs_updated'
            });
        } catch (e) { something_wrong(req, e) }
    },
    startDuration: (db, cacheClient) => async (req, res) => {
        try {
            const User = db_model('users', db.pool, cacheClient);
            let user = await User.find(req.user.id);
            log('startDuration:user:', JSON.stringify(user).substring(0, 300));
            if (user.invites_duration_start) {
                res.status(422).json({ message: 'You already start invites duration', message_code: 'user_already_started_duration' });
            } else {
                const upd_user = await runStartInvitesDurationTask({id: user.id}, db.pool, cacheClient);
                log('startDuration:upd_user:', JSON.stringify(upd_user).substring(0, 300));
                res.status(200).json({ data: upd_user, message: 'Start Invite Duration Successfully', message_code: 'user_start_duration' });
            }
        } catch (e) { something_wrong(req, e) }
    },
    show: (db, cacheClient) => async (req, res) => {
        const User = user_model(db, cacheClient);
        const token = req.cookies.remember_me;
        const rUser = req.user || {};
        const notFoundResp = () => res.status(401).send({message: 'User not found', message_code: 'user_not_found'});
        try {
            let user;
            if (rUser.id) {
                user = await User.find(rUser.id);
            } else if (token) {
                return await remember_me(db, cacheClient, req, res, notFoundResp);
            }
            if (!user || user.status === 'deleted') return notFoundResp();
            res.status(200).json({data: user});
        } catch (error) {
            res.status(500).json({message: `Something went wrong.`, error: error.message, message_code: '500'});
        }
    },
    closeAccount: (db, cacheClient) => async (req, res) => {
        try {
            await runCloseAccount({id: req.user.id, email: req.user.email}, db.pool, cacheClient);
            logout(req, res);
        } catch (e) { something_wrong(req, e) }
    },
};