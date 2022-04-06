import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Link } from 'react-router-dom'
import { authValidation } from '../../validation/auth-validation'
import { Context } from '../../index'
import { useForm } from 'react-hook-form'

interface AuthModalRegistrationProps {
    rightPanelActive: boolean,
    setRightPanelActive: Dispatch<SetStateAction<boolean>>
}

const AuthModalRegistration = ({rightPanelActive, setRightPanelActive}: AuthModalRegistrationProps) => {
    const {store} = useContext(Context)

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: 'onBlur'
    })


    const registrationRequest = (name: string, email: string, password: string) => {
        store.registration(name, email, password)
            .then((response: number | undefined) => {
                if (response !== 200) {
                    return console.log('CRASHED!')
                }
                setRightPanelActive(!rightPanelActive)
                reset()
            })
    }

    const onSubmitRegistration = (data: any) => {
        registrationRequest(data.name, data.email, data.password)
    }

    return (
        <div className="auth-modal__content__form-container sign-up-container">
            <form action="#" onSubmit={handleSubmit(onSubmitRegistration)}>
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

                <input type="text" {...register('name', authValidation.name)} placeholder="Имя" autoComplete="OFF" />
                <div className="validation-msg">{errors?.name && <p>{errors?.name?.message || 'Error! Try again.'}</p>}</div>

                <input type="email" {...register('email', authValidation.email)} placeholder="Email" autoComplete="OFF" />
                <div className="validation-msg">{errors?.email && <p>{errors?.email?.message || 'Error! Try again.'}</p>}</div>

                <input  type="password" {...register('password', authValidation.password)} placeholder="Пароль" autoComplete="OFF" />
                <div className="validation-msg">{errors?.password && <p>{errors?.password?.message || 'Error! Try again.'}</p>}</div>

                <button type="submit" className="auth-modal__content__button">Зарегистрироваться</button>
            </form>
        </div>

    )
}

export default AuthModalRegistration