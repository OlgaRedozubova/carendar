import C from '../constants';
import user from './user';

//reducers
export const users = (state = [], action) => {
    switch (action.type) {
        case  C.ADD_USER :
            return [
                ...state,
                user({}, action)
            ];
        case C.RATE_USER :
            return state.map(
                c => user(c, action)
            );
        case C.REMOVE_USER :
            return state.filter(
                c => c.id !== action.id
            );
        default:
            return state
    }
};

export const logout = () => ({
    isFetching: false,
    isFetchingUser: false,
    isFetchingUserError: false,
    isLoggedIn: false,
    data: {},
    fetchInterval: null,
    isAccountPending: false,
    vpage: '',
    langChanged: false,
});


export const removeUser = id => ({
    type: C.REMOVE_USER,
    id
});

export const rateUser = (id, rating) => ({
    type: C.RATE_USER,
    id,
    rating
});


export default users;