import React, { Component } from 'react';
import { BrowserRouter} from 'react-router-dom';
//import logo from '../logo.svg';
import Users from './users/users';

import {languages} from "../utils/constants";
//helpers
import ClassNames from 'classnames';
import i18n from '../utils/i18n';

//components
import NavBar from './navbar/navbar';
import Routes from "./Routes";

//style
import '../assets/stylesheets/style.css';

class App extends Component {
  render() {
      const { className } = this.props;
      const newClassName = ClassNames(
          'wrapper', i18n.locale,
          languages.filter(function(languages) {
              return languages.code === i18n.locale;
          })[0].dir,
          className
      );
    return (
        <BrowserRouter>
            <div className={newClassName}>
                {/*Navbar*/}
                <NavBar />
                {/*<NavBar sticky />*/}

                {/*Routes*/}
                <Routes/>
            </div>
        </BrowserRouter>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      //     <Users />
      // </div>
    );
    }
}

export default App;
