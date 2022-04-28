import React from 'react'

import SettingsInputs from './SettingsInputs/SettingsInputs'
import SettingsTabs from './SettingsTabs/SettingsTabs'

import './SettingsSection.scss'

const SettingsSection = () => {
    return (
        <div className="profile-page__settings">
            <div className="profile-page__container" style={{paddingTop: '0'}}>

                <div className="profile-page__settings__content">

                    <SettingsTabs />
                    <SettingsInputs />
                    <div className="profile-page__settings__empty-block" />

                </div>

            </div>
        </div>
    )
}

export default SettingsSection