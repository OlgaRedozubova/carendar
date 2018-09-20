import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

//helpes
import ClassNames from 'classnames';
import i18n from "../../utils/i18n";
//style
import './navbar-style.css';

export default class NavBar extends Component {
    render() {
        const { className, sticky, withBtn, uiStore, invite, auth } = this.props;
        const newClassName = ClassNames('NavBar', className, {
            sticky: sticky,
            //active: sticky && uiStore.scrollPosition > 80
        });
        const isLoggedIn = false;
        return(
            <div className={newClassName}>
                <nav className="column">
                    <div className="menu">
                        <div className="NavBar-link-wrapper">
                            <NavLink className="NavBar-link" to="/FAQ" activeClassName="selected">
                                {i18n.t('menu.faq')}
                            </NavLink>
                        </div>
                        <div className="NavBar-link-wrapper">
                            <NavLink className="NavBar-link" to="/about" activeClassName="selected">
                                {i18n.t('menu.about')}
                            </NavLink>
                        </div>
                        <div className="NavBar-link-wrapper">
                            {/*{isLoggedIn && <LogOut className="NavBar-link">{i18n.t('menu.logout')}</LogOut>}*/}
                            {!isLoggedIn && (
                                <NavLink className="NavBar-link" to="/login" activeClassName="selected">
                                    {i18n.t('menu.login')}
                                </NavLink>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}