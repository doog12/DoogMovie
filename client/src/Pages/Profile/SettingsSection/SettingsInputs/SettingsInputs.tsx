import React, { useContext } from 'react'
import ProfileSettings from './ProfileSettings/ProfileSettings'
import { Context } from '../../../../index'
import { observer } from 'mobx-react-lite'
import SocialMediaSettings from './SocialMediaSettings/SocialMediaSettings'
import AppearanceSettings from './AppearanceSettings/AppearanceSettings'

const SettingsInputs = () => {
    const { store } = useContext(Context)
    const activeLink = store.activeSettingsLink

    return (
        <div className="profile-page__settings__inputs">
            {
                activeLink === 'Профиль'
                    ? <ProfileSettings />
                    : activeLink === 'Соц. сети'
                        ? <SocialMediaSettings />
                        : activeLink === 'Внешний вид'
                            ? <AppearanceSettings />
                            : ''
            }
        </div>
    )
}

export default observer(SettingsInputs)