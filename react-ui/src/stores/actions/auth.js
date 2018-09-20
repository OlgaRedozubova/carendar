// import axios from 'axios';

export const do_by_login = resp => ({
    type: 'ON_LOGIN',
    isLoggedIn: true,
    isFetching: false,
    data: resp.response.data,
});

export const onLoginFailed = (err) => ({
    type: 'ON_LOGIN_FAILED', err,
});

// export const onLogin = (form) => {
//     return dispatch => {
//         axios.get('/api/user/login', {...form})
//             .then(response => {
//                 dispatch(do_by_login(response))
//             })
//             .catch(error => {
//                 dispatch(onLoginFailed(error))
//             })
//     }
// }