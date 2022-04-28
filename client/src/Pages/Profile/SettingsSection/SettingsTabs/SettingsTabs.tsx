import React, { useContext } from 'react'
import { Context } from '../../../../index'
import { observer } from 'mobx-react-lite'
import { ActiveSettingsLink } from '../../../../models/ActiveLinks'

import './SettingsTabs.scss'

interface Links {
    title: ActiveSettingsLink
}

const SettingsTabs = () => {
    const { store } = useContext(Context)

    const links: Array<Links> = [
        {
            title: 'Профиль'
        },
        {
            title: 'Соц. сети'
        },
        {
            title: 'Внешний вид'
        }
    ]

    return (
        <div className="profile-page__settings__tabs">

            {
                links.map((link, index) => (
                    <div
                        className={`profile-page__settings__tabs__tab unselectable ${store.activeSettingsLink === link.title ? 'active' : ''}`}
                        onClick={() => store.setActiveSettingsLink(link.title)}
                        key={`${link.title}_${index}`}
                    >
                        <p>{link.title}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default observer(SettingsTabs)