import { AuthValidation } from './@interfaces'

export const authValidation: AuthValidation = {
    name: {
        required: 'Поле обязательно к заполнению',
        minLength: {
            value: 2,
            message: 'Имя должно содержать более двух символов!'
        },
    },
    email: {
        required: 'Поле обязательно к заполнению',
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Введите верный Email!'
        },
    },
    password: {
        required: 'Поле обязательно к заполнению',
        minLength: {
            value: 5,
            message: 'Пароль должен иметь минимум 5 символов!'
        },
        maxLength: {
            value: 24,
            message: 'Пароль не может быть больше 24 символов!'
        },
    }
}