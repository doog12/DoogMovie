import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Link } from 'react-router-dom'
import { authValidation } from '../../validation/auth-validation'
import { useForm } from 'react-hook-form'
import { Context } from '../../index'


const AuthModalLogin = ({setAuthModalActive}: {setAuthModalActive: Dispatch<SetStateAction<boolean>>}) => {
    const {store} = useContext(Context)
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    })

    const loginRequest = (email: string, password: string) => {
        store.login(email, password)
            .then((response: number | undefined) => {
                if (response !== 200) {
                    return console.log('CRASHED!')
                }
                setAuthModalActive(false)
            })
            .then((response) => {
                reset()
            })
    }

    const onSubmitLogin = (data: any) => {
        loginRequest(data.email, data.password)
    }

    return (
        <div className="auth-modal__content__form-container sign-in-container">
            <form action="#" onSubmit={handleSubmit(onSubmitLogin)}>
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
                <input type="email" {...register('email', authValidation.email)} placeholder="Email" autoComplete="OFF" />
                <div className="validation-msg">{errors?.email && <p>{errors?.email?.message || 'Error! Try again.'}</p>}</div>

                <input  type="password" {...register('password', authValidation.password)} placeholder="Пароль" autoComplete="OFF" />
                <div className="validation-msg">{errors?.password && <p>{errors?.password?.message || 'Error! Try again.'}</p>}</div>

                <Link to="/forgot_password" className="auth-modal__content__forgot-password">Забыли пароль?</Link>

                <button className="auth-modal__content__button">Вход</button>
            </form>
        </div>
    )
}

export default AuthModalLogin