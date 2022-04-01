import React, { useContext } from 'react'
import ProfileIcon from '../../../assets/images/Header/user_icon.png'
import { NavLinks } from '../Header'
import { Context } from '../../../index'

import './ProfileHeader.scss'

const ProfileHeader = () => {

    const {store} = useContext(Context)

    const navLinks: NavLinks[] = [
        {
            title: 'Профиль',
            link: '/profile'
        },
        {
            title: 'Избранное',
            link: '/favorites'
        }
    ]


    return (
        <div className='header__utils__profile'>
            <div className='header__utils__login unselectable'>
                <img src={ProfileIcon} alt='profile' className='header__utils__login-key header__utils__profile__img' />
            </div>
            <div className='header__utils__profile__dropdown__menu'>
                {
                    navLinks.map((item: NavLinks, index: number) => (
                        <a href={item.link} className='header__utils__profile__dropdown__menu__item'
                           key={index}>{item.title}</a>
                    ))
                }
                <button className='header__utils__profile__dropdown__menu__item'
                   onClick={() => store.logout()}>Выйти</button>
            </div>
        </div>
    )
}

export default ProfileHeader