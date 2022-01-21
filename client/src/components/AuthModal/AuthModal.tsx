import React, { useState } from 'react'

import './AuthModal.scss'
const AuthModal = ({ authModalActive, setAuthModalActive }: any) => {

    const [rightPanelActive, setRightPanelActive] = useState(false)

    return (
        <div className={`auth-modal ${authModalActive ? 'active' : ''}`}>
            <div className={`auth-modal__content ${rightPanelActive ? 'right-panel-active' : ''}`}>
                <div className="auth-modal__content__form-container sign-up-container">
                    <form action="#" onSubmit={(event) => event.preventDefault()}>
                        <h1>Регистрация</h1>
                        <div className="auth-modal__content__form-container__social-container">
                            <a href="#" className="social">
                                <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-google-plus-g" />
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-linkedin-in" />
                            </a>
                        </div>
                        <span>или используйте свой E-mail для регистрации</span>
                        <input type="text" autoComplete="OFF" placeholder="Имя" required/>
                        <input type="email" autoComplete="OFF" placeholder="Email" required/>
                        <input type="password" autoComplete="OFF" placeholder="Пароль" required/>
                        <button className="auth-modal__content__button">Зарегистрироваться</button>
                    </form>
                </div>
                <div className="auth-modal__content__form-container sign-in-container">
                    <form action="#" onSubmit={(event) => event.preventDefault()}>
                        <h1>Авторизация</h1>
                        <div className="auth-modal__content__form-container__social-container">
                            <a href="#" className="social">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-google-plus-g"></i>
                            </a>
                            <a href="#" className="social">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <span>или используйте свой аккаунт</span>
                        <input type="email" autoComplete="OFF" placeholder="Email" required/>
                        <input type="password" autoComplete="OFF" placeholder="Пароль" required/>
                        <a href="#" className="auth-modal__content__forgot-password">Забыли пароль?</a>
                        <button className="auth-modal__content__button">Вход</button>
                    </form>
                </div>
                <div className="auth-modal__content__overlay-container">
                    <div className="auth-modal__content__overlay">
                        <div className="auth-modal__content__overlay-panel overlay-left">
                            <h1 className="auth-modal__content__title">Добро пожаловать!</h1>
                            <p className="auth-modal__content__subtitle">
                                Чтобы оставаться на связи с нами, пожалуйста, войдите в систему
                            </p>
                            <button className="auth-modal__content__button ghost" id="signIn" onClick={() => setRightPanelActive(!rightPanelActive)}>
                                Авторизация
                            </button>
                        </div>
                        <div className="auth-modal__content__overlay-panel overlay-right">
                            <h1 className="auth-modal__content__title">Привет, Друг!</h1>
                            <p className="auth-modal__content__subtitle">Введите свои личные данные и погрузитесь в мир кино вместе с нами</p>
                            <button className="auth-modal__content__button ghost" id="signUp" onClick={() => setRightPanelActive(!rightPanelActive)}>
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-modal__blur" onClick={() => setAuthModalActive(!authModalActive)}/>
        </div>
    )
}

export default AuthModal
