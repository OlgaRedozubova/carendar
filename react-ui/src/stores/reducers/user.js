import C from "../constants";

const user = (state = {}, action) => {
    switch (action.type) {
        case C.ADD_USER:
            return {
                id: action.id,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName,
                rating: 0
            };
        case C.RATE_USER:
            return (state.id !== action.id) ?
                state :
                {
                    ...state,
                    rating: action.rating
                };
        default :
            return state
    }
};

export default user;