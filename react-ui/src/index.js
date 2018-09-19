import React from 'react';
import {render} from 'react-dom';
import './index.css';
import App from './components/App';
// import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { compose } from 'redux';
import storeFactory from './stores';
import {removeUser, rateUser} from "./stores/users";
import {sortUser} from "./stores/sort";

const store = storeFactory();
store.subscribe(() => {
    localStorage['redux-store'] = JSON.stringify(store.getState())
});


console.log( store.getState().users.length ); // 3
console.log( store.getState().sort); // "SORTED_BY_TITLE"

store.subscribe(() => console.log('users count:', store.getState().users.length));

store.dispatch({
    type: "ADD_USER",
    id: '04',
    email: 'bigest@gmail.com',
    firstName: 'Bigest',
    lastName: 'Blue',
    rating: 2
});
store.dispatch({
    type: "ADD_USER",
    id: '05',
    email: 'long@gmail.com',
    firstName: 'Long',
    lastName: 'Blue',
    rating: 3
});

// store.dispatch({
//     type: "RATE_USER",
//     id: "05",
//     rating: 5
// });
// store.dispatch({
//     type: "REMOVE_USER",
//     id: "04"
// });


store.dispatch( removeUser("05") );
store.dispatch( rateUser("04", 5) );
store.dispatch( sortUser("title") );

console.log(store.getState().users.map(c=>c.email).join(", "));

const print = compose(
    list => console.log(list),
    emails => emails.join(", "),
    map => map(c=>c.email),
    users => users.map.bind(users),
    state => state.users
)
print(store.getState());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
//registerServiceWorker();
