import React, { Component } from 'react';
import {connect} from "react-redux";

//helpers
import ClassNames from 'classnames';
import i18n from '../../utils/i18n';

//components
import InputWrapper from './input';
import {do_by_login, onLoginFailed} from "../../stores/actions/auth";
import axios from "axios/index";

class Form extends Component {
    static defaultProps = {
        isSignUp: false
    };

    constructor (props) {
        super(props);
        this.form = React.createRef();
        this.onContinue = this.onContinue.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            checked: false,
            isValid: false,
            buttonDisabled: false,
            isValidRecaptcha: false,
            form: {
                invite_code: '',
                email: '',
                password: '',
                full_name: ''
            },
            error: undefined
        }
    }

    onContinue(e) {
        console.log('onContinue');
        this.setState({error: undefined});
        e.preventDefault();

        this.props.location.hash = '';
        const {login} = this.props;

        if (!login) {
            // if (this.recaptchaInstance) this.recaptchaInstance.execute();
            // if (!this.state.checked) {
            //     this.checkIfTermsAccepted(this.onSignUp);
            //     return;
            // }
        //    return this.onSignUp();
        }

        this.onLogin();
    }

    onLogin() {
        const form = this.state.form;
        const {history, login, auth, invite} = this.props;
        const {onLogin} = auth;

        if (form.email !== '' && form.password !== '') {
            // if (validateEmail(form.email)) {
                onLogin(form)
                    .then(response => {
                        // GA_login('login-email', 'login', 'email');
                        // if (login) this.goToDashboard();
                        console.log('onLogin response => ', response);
                    })
                    .catch(error => {
                        console.log('onLogin error => ', error);
                        // if (error.status === 422) {
                        //     invite.updateSignUpEmail(form.email);
                        //     sessionStorage.setItem('email', form.email);
                        //     history.push(`/verification`)
                        // } else {
                        //     this.oState.error = i18n.t('messages.' + error.message_code);
                        // }
                    })
            // } else {
            //     this.oState.error = i18n.t('forms.invalidEmail');
            // }
        }
    };

    render() {
        const newClassName = ClassNames('Form', className);
        console.log('auth => ', this.props.auth);
        return (
            <div className={newClassName} ref={this.form}>
                <form onSubmit={this.onContinue}>
                    <InputWrapper
                        type="email"
                        label={i18n.t('forms.email')}
                        value={form.email}
                        error={error === 'Invalid email address'}
                        required={true}
                        onChange={e => this.onFormValueChanged('email', e.target.value)}
                        onSetValue={this.SetValue}
                        isLogin={this.props.login}
                    />
                    <InputWrapper
                        type="password"
                        label={i18n.t('forms.password')}
                        value={form.password}
                        required={true}
                        onChange={e => this.onFormValueChanged('password', e.target.value)}
                        onSetValue={this.SetValue}
                        isLogin={this.props.login}
                    />
                    <Button primary fat submit className="shadow btn" disabled={buttonDisabled}>
                        <span className="label">{login ? i18n.t('forms.login') : i18n.t('forms.sign_up')}</span>
                    </Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state =>
    ({
        auth: [...state.auth]//.sort(sortFunction(state.sort))
    });

const mapDispatchToProps = dispatch =>
    ({
        onLogin (form){
            return dispatch => {
                axios.get('/api/user/login', {...form})
                    .then(response => {
                        dispatch(do_by_login(response))
                    })
                    .catch(error => {
                        dispatch(onLoginFailed(error))
                    })
            }
        },

        // onRemove(id) {
        //     dispatch(removeUser(id))
        // },
        // onRate(id, rating) {
        //     dispatch(rateUser(id, rating))
        // }
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form);
