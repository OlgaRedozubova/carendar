const initialState = {
    users: [
        {
            id: '01',
            email: 'red@gmail.com',
            firstName: 'Red',
            lastName: 'Red',
            rating: 3
        },
        {
            id: '02',
            email: 'creazy@gmail.com',
            firstName: 'Creazy',
            lastName: 'Green',
            rating: 0
        },
        {
            id: '03',
            email: 'big@gmail.com',
            firstName: 'Big',
            lastName: 'Blue',
            rating: 5
        },
    ],
    configure: {
        appName: 'Calendar',
        isFetching: false,
        isAuthenticate: false
    },
    auth: {
        isFetching: false,
        isResetingPassword: false,
        isUpdating: false,
        isFetchingUser: false,
        isFetchingUserError: false,
        isLoggedIn: false,
        data: {},
        fetchInterval: null,
        isAccountPending: false,
        emailPrefs: {},
        vpage: '',
        pingFailCount: 0,
    },
    sort: "SORTED_BY_TITLE"
};

export default initialState;