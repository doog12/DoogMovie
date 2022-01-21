import React, { useState } from 'react'
import './Header.scss'
import './Burger.scss'

import AuthModal from '../../components/AuthModal/AuthModal'

import KeyIconSVG from '../../assets/images/Header/key-icon.svg'
import { Link } from 'react-router-dom'

const Header = () => {
    const [burgerActive, setBurgerActive] = useState(false)
    const [activeNavLink, setActiveNavLink] = useState('Главное меню')

    const [authModalActive, setAuthModalActive] = useState(false)

    const navLinks = [
        {
            title: 'Главное меню',
            link: '/'
        },
        {
            title: 'Фильмы',
            link: '/movies'
        },
        {
            title: 'ТВ шоу',
            link: '/tv'
        },
        {
            title: 'Аниме',
            link: '/animes'
        }
    ]

    const burgerNavLinks = [
        ...navLinks,
        {
            title: 'Войти / Зарегистрироваться',
            link: '#'
        }
    ]

    return (
        <>
            <header className="header">
                <div className="header__container">
                    <div className="header__logo">
                        <h1 className="header__logo__title unselectable">
                            <Link to="/">
                                <span className="header__logo__title__span-red">Doog</span> Movie
                            </Link>
                        </h1>
                    </div>

                    <nav className="navbar">
                        <ul className="navbar__list unselectable">
                            {navLinks.map((item, index) => (
                                <li className={`navbar__list__item ${activeNavLink === item.title ? 'active' : ''}`} key={index} onClick={() => setActiveNavLink(item.title)} >
                                    <Link to={item.link}>{item.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="header__utils">
                        <div className="header__utils__search">
                            <input
                                type="text"
                                name="search"
                                placeholder="Поиск..."
                                className="header__utils__search__input unselectable"
                                autoComplete="OFF"
                            />
                        </div>

                        <div className="header__utils__login unselectable" onClick={() => setAuthModalActive(!authModalActive)}>
                            <img src={KeyIconSVG} alt="key" className="header__utils__login-key" />
                        </div>

                        <AuthModal authModalActive={authModalActive} setAuthModalActive={setAuthModalActive}/>


                        {/* Burger Menu */}
                        <div
                            className={`burger-menu ${burgerActive === true ? 'active' : ''}`}
                            onClick={() => setBurgerActive(!burgerActive)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </header>
            <div className={`burger-nav ${burgerActive === true ? 'active' : ''}`}>
                {
                    burgerNavLinks.map((item, index) => (
                        <li key={index} onClick={() => setBurgerActive(!burgerActive)}>
                            <Link to={item.link} className="burger-nav__link">
                                {item.title}
                            </Link>
                        </li>
                    ))
                }
            </div>
        </>
    )
}

export default Header
