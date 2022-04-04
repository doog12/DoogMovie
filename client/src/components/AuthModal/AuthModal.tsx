import React, { ChangeEvent, useContext, useState } from 'react'
import './AuthModal.scss'
import { Context } from '../../index'
import { Link } from 'react-router-dom'


const AuthModal = ({ authModalActive, setAuthModalActive }: { authModalActive: boolean, setAuthModalActive: React.SetStateAction<any> }) => {
    const {store} = useContext(Context)

    const [rightPanelActive, setRightPanelActive] = useState<boolean>(false)

    // ======================= Login =======================

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const loginChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, [event.target.name]: event.target.value})
    }
    const loginRequest = () => {
        store.login(loginData.email, loginData.password)
            .then((response: number | undefined) => {
                if (response !== 200) {
                    return console.log('CRASHED!')
                }
                setAuthModalActive(false)
            })
            .then(() => {
                setLoginData({
                    email: '',
                    password: ''
                })
            })
    }

    // =====================================================


    // ======================= Registration =======================

    const [registrationData, setRegistrationData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const registrationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({...registrationData, [event.target.name]: event.target.value})
    }
    const registrationRequest = () => {
        store.registration(registrationData.name, registrationData.email, registrationData.password)
            .then((response: number | undefined) => {
                if (response !== 200) {
                    return console.log('CRASHED!')
                }
                setRightPanelActive(!rightPanelActive)
            })
            .then(() => {
                setRegistrationData({
                    name: '',
                    email: '',
                    password: ''
                })
            })

    }

    // ============================================================


    return (
        <div className={`auth-modal ${authModalActive ? 'active' : ''}`}>
            <div className={`auth-modal__content ${rightPanelActive ? 'right-panel-active' : ''}`}>


                {/*============= SIGN UP =================*/}

                <div className="auth-modal__content__form-container sign-up-container">
                    <form action="#" onSubmit={(event) => event.preventDefault()}>
                        <h1>Регистрация</h1>
                        <div className="auth-modal__content__form-container__social-container">
                            <Link to="#" className="social">
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link to="#" className="social">
                                <i className="fab fa-google-plus-g" />
                            </Link>
                            <Link to="#" className="social">
                                <i className="fab fa-linkedin-in" />
                            </Link>
                        </div>
                        <span>или используйте свой E-mail для регистрации</span>

                        <input type="text" autoComplete="OFF" value={registrationData.name} name="name" placeholder="Имя" onChange={(e) => registrationChangeHandler(e)} required/>
                        <input type="email" autoComplete="OFF" value={registrationData.email} name="email" placeholder="Email" onChange={(e) => registrationChangeHandler(e)} required/>
                        <input type="password" autoComplete="OFF" value={registrationData.password} name="password" placeholder="Пароль" onChange={(e) => registrationChangeHandler(e)} required/>

                        <button className="auth-modal__content__button" onClick={() => registrationRequest()}>Зарегистрироваться</button>

                    </form>
                </div>


                {/*============= SIGN IN =================*/}

                <div className="auth-modal__content__form-container sign-in-container">
                    <form action="#" onSubmit={(event) => event.preventDefault()}>
                        <h1>Авторизация</h1>
                        <div className="auth-modal__content__form-container__social-container">
                            <Link to="#" className="social">
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link to="#" className="social">
                                <i className="fab fa-google-plus-g" />
                            </Link>
                            <Link to="#" className="social">
                                <i className="fab fa-linkedin-in" />
                            </Link>
                        </div>
                        <span>или используйте свой аккаунт</span>
                        <input type="email" autoComplete="OFF" value={loginData.email} name="email" placeholder="Email" onChange={(e) => loginChangeHandler(e)} required/>
                        <input type="password" autoComplete="OFF" value={loginData.password} name="password" placeholder="Пароль" onChange={(e) => loginChangeHandler(e)} required/>
                        <Link to="/forgot_password" className="auth-modal__content__forgot-password">Забыли пароль?</Link>

                        <button className="auth-modal__content__button" onClick={() => loginRequest()}>Вход</button>

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
