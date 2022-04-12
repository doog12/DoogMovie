import React from 'react'
import ProfileUserInfo from './ProfileUserInfo/ProfileUserInfo'

import './Profile.scss'

const Profile = () => {
    return (
        <div className="profile-page">
            <div className="profile-page__container">
                <div className="profile-page__title">
                    <h2 className="unselectable">Мой Профиль</h2>
                </div>

                <ProfileUserInfo />
            </div>
        </div>
    )
}

export default Profile
