import React from 'react'
import oneUser from '../../svg/user.svg';

const UserNotFoundPage = () => (
    <div className='user-not-found-page'>
        <img className = 'user-not-found-svg' src={oneUser} alt="one user" />
        <p className='user-not-found-text'>User not found</p>
    </div>
)

export default UserNotFoundPage