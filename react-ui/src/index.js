import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';

import storeFactory from './stores';

import './index.css';

const store = storeFactory();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
