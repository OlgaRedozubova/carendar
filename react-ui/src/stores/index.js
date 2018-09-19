import { createStore,
    combineReducers,
    applyMiddleware} from 'redux';
import configure from './configure';
import auth from './auth';
import users from './users';
import sort from './sort';
import stateData from './initialState';

const stores = {
    configure,
    auth,
    users,
    sort,
    // invite,
    // UiStore,
    // UserStore,
    // users,
    // friends,
    // contacts,
};

const logger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action)
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
};
const saver = store => next => action => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
};

// export default function storeFactory(initialState) {
//     return createStore(combineReducers(stores),
//         (localStorage['redux-store']) ?
//             JSON.parse(localStorage['redux-store']) :
//             {}
//     );
// }
const storeFactory = (initialState=stateData) =>
    applyMiddleware(logger, saver)(createStore)(
        combineReducers(stores),
        (localStorage['redux-store']) ?
            JSON.parse(localStorage['redux-store']) :
            initialState
    );
export default storeFactory