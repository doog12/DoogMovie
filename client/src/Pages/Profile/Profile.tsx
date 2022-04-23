import React from 'react'
import ProfileUserInfo from './ProfileUserInfo/ProfileUserInfo'
import SettingsSection from './SettingsSection/SettingsSection'

import './Profile.scss'

const Profile = () => {
    return (
        <div className="profile-page">
                <ProfileUserInfo />
                <SettingsSection />
        </div>
    )
}

export default Profile
