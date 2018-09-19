require('dotenv').config();
// const logger = require('heroku-logger');
// const express = require('express');
// const path = require('path');
//
//
// const requestIp = require('request-ip');
//
// const auth = require('./middlewares/auth.js');
// const users = require('../api/user');
//
//
// const add_is_login = require('../utils/add_is_login');
// const handle_passport_error = require('../utils/handle_passport_error');
// const twitter_utils = require('../utils/twitter_utils');

module.exports = (app, passport, dbClient, cacheClient) => {
    // app.use(requestIp.mw());
    // app.use(passport.initialize());
    // app.use(passport.session());
    // app.use(passport.authenticate('remember-me'));

    // if (process.env.SECURE === 'true') {
    //     app.all('*', passport.authenticate('basic-http', { session: false }));
    // }
    //
    // if (process.env.NODE_ENV === 'production') {
    //     // only force ssl in prod
    //     app.use(function(req, res, next) {
    //         if (req.headers['x-forwarded-proto'] != 'https') res.redirect(['https://', req.get('Host'), req.url].join(''));
    //         else next();
    //     });
    // }
    app.get('/', function (req, res) {
        res.send('Hello World!');
    });

    // app.get('/static/bounty', bounty.get(dbClient, cacheClient));
    //
    // app.post('/api/auth/twitter/reverse', twitter_utils.reverse);
    // app.get('/api/auth/twitter/token', twitter_utils.callback, 					passport.authenticate('twitter-token', { session: false }), users.login_response);
    // app.get('/api/login/twitter/token', add_is_login, twitter_utils.callback, 	passport.authenticate('twitter-token', { session: false }), users.login_response);
    //
    // app.get('/api/auth/facebook/token', 				passport.authenticate('facebook-token'), users.login_response, handle_passport_error);
    // app.get('/api/login/facebook/token', add_is_login, 	passport.authenticate('facebook-token'), users.login_response, handle_passport_error);
    //
    // app.get('/api/auth/google/token', 					passport.authenticate('google-token'), 	users.login_response);
    // app.get('/api/login/google/token', add_is_login, 	passport.authenticate('google-token'), 	users.login_response);

    // app.post('/api/user/login', 				passport.authenticate('local-login'), 	users.login_response);
    // app.post('/api/user/new', verifyRecaptcha, 	passport.authenticate('local-signup'), 	users.register);
    // app.get('/api/user/remember_me', users.rememberMe(dbClient, cacheClient));
    // app.post('/api/user/reset_pass', verifyRecaptcha, users.resetPassword(dbClient, cacheClient));
    // app.post('/api/users/new_pass', password.updatePassword(dbClient, cacheClient));

    // app.post('/api/user/resend_email_confirmation',   users.resendEmailConfirmation(dbClient, cacheClient));
    // app.post('/api/user/confirm_email', 			  users.confirmEmail(dbClient, cacheClient));
    //
    // app.get('/api/user/mail_prefs', 				  users.mailPrefs(dbClient, cacheClient));
    // app.post('/api/user/mail_prefs', 				  users.updateMailPrefs(dbClient, cacheClient));
    app.get('/api/user', 						 function(reg,res){res.send('api/user/Hello World!')});
    // app.get('/api/user', 						auth, users.show(dbClient, cacheClient));
    // app.get('/api/logout', 						auth, users.logout);
    // app.get('/api/user/invites/start_duration', auth, users.startDuration(dbClient, cacheClient));
    // app.get('/api/user/close_account', 			auth, users.closeAccount(dbClient, cacheClient));
    // app.post('/api/user/confirm/user', 			auth, invite.confirmUser(dbClient, cacheClient));
    // app.get('/api/invites/:inviteCode', 			  invite.status(dbClient, cacheClient));

    // const react_routes = [
    //     '/', '/FAQ', '/terms', '/tos', '/privacy', '/about', '/login', '/verification', '/forgot_pass', '/dashboard', '/internal-error',
    //     '/verify/:token', '/reset_pass/:token/:email', '/unsubscribe/:token/:email', '/invite/:inviteCode',
    //     '/knowledge/payment-network', '/knowledge/economic-model',
    // ];
    // const mainHtmlMaxAge = 5 * 60 * 1000; //15 min
    // const send_react_index = (request, response) => response.sendFile(path.resolve(__dirname, '../../react-ui/build', 'index.html'),{ maxAge: mainHtmlMaxAge,  's-maxage': mainHtmlMaxAge });
    //
    // for (let i = 0; i < react_routes.length; i++) {
    //     app.get(react_routes[i], send_react_index)
    // }
    //
    // const staticMaxAge = 60 * 1000 * 60 * 6; //6 hours
    // // app.use(express.static('staticFile', { maxAge: oneMonth,  's-maxage': oneMonth }));
    // app.use(express.static(path.resolve(__dirname, '../../react-ui/build'),{ maxAge: staticMaxAge,  's-maxage': staticMaxAge }));
    // app.get('*', 			send_react_index);

    // app.use(function(err, req, res, next) {
    // 	logger.info(`error ${JSON.stringify(err)}`);
    // 	next();
    // });
};
