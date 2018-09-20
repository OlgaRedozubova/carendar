import C from '../constants';

const AuthStore = (state = {}, action) => {
    switch (action.type) {
        case C.ON_LOGOUT:
            return {
                ...state,
                isFetching: false,
                isAuthenticate: false
            };
        case C.ON_LOGIN:
            return {
                ...state,
                isFetching: false,
                isAuthenticate: true
            };
        default : return state
    }
};

export default AuthStore;