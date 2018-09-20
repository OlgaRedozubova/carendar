import C from "../constants";

const sort = (state = "SORTED_BY_DATE", action) => {
    switch (action.type) {
        case C.SORT_USERS:
            return action.sortBy
        default:
            return state
    }
};

export const sortUser = sortedBy =>
    (sortedBy === "rating") ?
        ({
            type: C.SORT_USERS,
            sortBy: "SORTED_BY_RATING"
        }) :
        (sortedBy === "title") ?
            ({
                type: C.SORT_USERS,
                sortBy: "SORTED_BY_TITLE"
            }) :
            ({
                type: C.SORT_USERS,
                sortBy: "SORTED_BY_DATE"
            });

export default sort;
