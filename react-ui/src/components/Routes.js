import React, { Component } from 'react';
import { Route as RRR, Switch, withRouter, Redirect } from 'react-router-dom';

//components
import Home from "./home/home";
// import EconomicModel from "../../../../starling-web-olga/react-ui/src/components/economic-model/economic-model";
import Login from "./login/login";
// import Error404 from "../../../../starling-web-olga/react-ui/src/components/error/error-404";
// import Error500 from "../../../../starling-web-olga/react-ui/src/components/error/error-500";
// import Invite from "../../../../starling-web-olga/react-ui/src/components/invite/invite";
// import Timeline from "../../../../starling-web-olga/react-ui/src/components/timeline/timeline";
import About from "./about/about";
//import Verification from "../../../../starling-web-olga/react-ui/src/components/verification/verification";
import FAQ from "./faq/faq";
// import Terms from "../../../../starling-web-olga/react-ui/src/components/terms/terms";
// import Privacy from "../../../../starling-web-olga/react-ui/src/components/privacy/privacy";
// import PaymentNetwork from "../../../../starling-web-olga/react-ui/src/components/payment-method/payment-method";
// import Unsubscribe from "../../../../starling-web-olga/react-ui/src/components/unsubscribe";
// import Dashboard from "../../../../starling-web-olga/react-ui/src/components/dashboard/dashboard";
// import UpdatePassword from "../../../../starling-web-olga/react-ui/src/components/forgot-password/forgot-password";

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} redirect/>
                {/*<Route path="/Timeline" component={Timeline} />*/}
                <Route path="/FAQ" component={FAQ} />
                {/*<Route path="/knowledge/payment-network" component={PaymentNetwork} />*/}
                {/*<Route path="/knowledge/economic-model" component={EconomicModel} />*/}
                {/*<Route path="/terms" component={Terms} />*/}
                {/*<Route path="/tos" component={Terms} />*/}
                {/*<Route path="/privacy" component={Privacy} />*/}
                <Route path="/about" component={About} />

                <Route path="/login" component={Login} redirect/>
                {/*<Route path="/verification" component={Verification} />*/}
                {/*<Route path="/verify/:token" component={Verification} />*/}
                {/*<Route path="/reset_pass/:token/:email" component={UpdatePassword} />*/}
                {/*<Route path="/forgot_pass" component={UpdatePassword} redirect/>*/}
                {/*<Route path="/unsubscribe/:token/:email" component={Unsubscribe} />*/}
                {/*<Route path="/dashboard" component={Dashboard} public={false} />*/}
                {/*<Route path="/invite/:inviteCode" component={Invite} redirect/>*/}
                {/*<Route path="/internal-error" component={Error500}/>*/}
                {/*<Route component={Error404} />*/}
            </Switch>
        )
    }
};

class Route extends React.Component{
    static defaultProps = {
        public: true,
        redirect: false,
    };

    render() {
        const { ...restProps } = this.props;
        // const { isLoggedIn = false, isCheckingAuth = false} = this.props.auth;
         const  isLoggedIn = false;
        if (!isLoggedIn && !this.props.public) return <Redirect to={'/login'} />;
        if (this.props.public && this.props.redirect && isLoggedIn) return <Redirect to={'/dashboard'} />;
        if (this.props.public) return <RRR {...restProps} />;
        // if (isCheckingAuth) return <div/>;
        // if (!isCheckingAuth && isLoggedIn && !this.props.public) return <RRR {...restProps} />;
        return <Redirect to={'/'} />;
    }
}