import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from './user';
import { sortFunction } from '../../lib/array-helpers'

import {rateUser, removeUser} from "../../stores/reducers/users";

// class Users extends Component{
//     render(){
//         console.log('users => ', this.props.users);
//         return(
//             <div>
//                 Users
//             </div>
//         )
//     }
//
// }

const Users = ({ users=[], onRate=f=>f, onRemove=f=>f }) =>
    <div className="color-list">
        {(users.length === 0) ?
            <p>No Colors Listed. (Add a Color)</p> :
            users.map(user =>
                <User key={user.id}
                       {...user}
                       onRate={(rating) => onRate(user.id, rating)}
                       onRemove={() => onRemove(user.id)} />
            )
        }
    </div>

Users.propTypes = {
    users: PropTypes.array,
    onRate: PropTypes.func,
    onRemove: PropTypes.func
};


const mapStateToProps = state =>
    ({
        users: [...state.users].sort(sortFunction(state.sort))
    });

const mapDispatchToProps = dispatch =>
    ({
        onRemove(id) {
            dispatch(removeUser(id))
        },
        onRate(id, rating) {
            dispatch(rateUser(id, rating))
        }
    });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
