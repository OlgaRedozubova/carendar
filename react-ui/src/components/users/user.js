import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StarRating from './StarRating'
import TimeAgo from './TimeAgo'
//import FaTrash from 'react-icons/lib/fa/trash-o'
//import '../../../stylesheets/Color.scss'

class User extends Component {
    render() {
        const { email, firstName, rating, timestamp, onRemove, onRate} = this.props;
        return (
            <section className="user" style={this.style}>
                <h1 ref="email">{email}</h1>
                <button onClick={onRemove}>onRemove
                    {/*<FaTrash />*/}
                </button>
                <div className="firstName">{firstName}
                </div>
                <TimeAgo timestamp={timestamp} />
                <div>
                    <StarRating starsSelected={rating} onRate={onRate}/>
                </div>
            </section>
        )
    }

}

User.propTypes = {
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    rating: PropTypes.number,
    onRemove: PropTypes.func,
    onRate: PropTypes.func
};

User.defaultProps = {
    rating: 0,
    onRemove: f=>f,
    onRate: f=>f
};

export default User;