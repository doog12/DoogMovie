import React, { CSSProperties, useContext } from 'react'
import { Context } from '../../../../../index'
import { useForm } from 'react-hook-form'
import { items } from './items'
import { requestService } from './requestService'

export interface DataType {
    [key: string]: string
}

const SocialMediaSettings = () => {
    const { store } = useContext(Context)

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        reset
    } = useForm({
        mode: 'onChange'
    })

    // .validation-msg Inline Styles
    const validationMsgStyles: CSSProperties = {
        marginBottom: '0',
        fontSize: '1.1rem',
        position: 'absolute'
    }

    const requestHandler = (data: DataType): void => {
        const filteredData = requestService(data)
        store.updateSocialMedia(filteredData)
            .then(() => {
                reset()
                window.location.reload()
            })
    }

    const onSubmit = (data: DataType): void => {
        requestHandler(data)
    }

    return (
        <form className='profile-page__settings__form' onSubmit={handleSubmit(onSubmit)}>
            {items.map((item, index: number) => (
                <div
                    className='profile-page__settings__inputs__section'
                    key={`${item.title}_${index}`}
                >
                    <div className='profile-page__settings__inputs__title'>
                        <p>{item.title}</p>
                    </div>
                    <div className='profile-page__settings__inputs__input'>
                        <input
                            type={item.inputType || 'text'}
                            placeholder={item.placeholder}
                            inputMode={item.inputMode}
                            autoComplete='off'
                            {...register(item.name, item.validation)}
                        />
                        <img
                            src={item.icon}
                            alt={item.title.toString()}
                            className='profile-page__settings__inputs__input--img unselectable non-draggable'
                            draggable='false'
                        />
                    </div>
                    <div className='validation-msg' style={validationMsgStyles}>
                        {errors?.[item.name] && (<p>{errors?.[item.name]?.message || 'Error! Try again.'}</p>)}
                    </div>
                </div>
            ))}
            <div className='profile-page__settings__inputs__buttons'>
                <button disabled={!isDirty || !isValid} className='save-button'>
                    Сохранить изменения
                </button>
                <button disabled={!isDirty} onClick={() => reset()}>
                    Сброс
                </button>
            </div>
        </form>
    )
}

export default SocialMediaSettings
