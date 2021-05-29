import React from 'react'
import emptyRepo from "../../svg/empty.svg";


const EmptyRepo = () => (
    <div className='empty-repo-page empty-repo-container'>
        <div className='empty-repo-inner'>
        <img className = 'empty-repo-svg' src={emptyRepo} alt="empty repo" />
        <p className='empty-repo-text'>Repository list is empty</p>
        </div>
    </div>
)

export default EmptyRepo