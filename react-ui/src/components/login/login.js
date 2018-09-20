import React from 'react';

//helpers
import ClassNames from 'classnames';

//components
import Form from "../form/form";
import Info from "../info/info";


//styles
import './login.css';


export default class Login extends React.Component {


    render() {
        const {className} = this.props;
        const newClassName = ClassNames('Login',className);

        return (
            <article className={newClassName}>

                <Form title='Login' login flip/>
                <img alt="" className="safe" src={require('../../assets/images/safe-open.svg')}/>
                {/*<Info/>*/}

            </article>
        );
    }
}
