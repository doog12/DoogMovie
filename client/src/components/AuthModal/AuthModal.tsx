import React, { useState } from 'react'
import './AuthModal.scss'

import AuthModalLogin from './AuthModalLogin'
import AuthModalRegistration from './AuthModalRegistration'

const AuthModal = ({ authModalActive, setAuthModalActive }: { authModalActive: boolean, setAuthModalActive: React.SetStateAction<any> }) => {

    const [rightPanelActive, setRightPanelActive] = useState<boolean>(false)


    return (
        <div className={`auth-modal ${authModalActive ? 'active' : ''}`}>
            <div className={`auth-modal__content ${rightPanelActive ? 'right-panel-active' : ''}`}>


                {/*============= SIGN UP =================*/}
                <AuthModalRegistration setRightPanelActive={setRightPanelActive} rightPanelActive={rightPanelActive}/>

                {/*============= SIGN IN =================*/}
                <AuthModalLogin setAuthModalActive={setAuthModalActive} />



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
