import { AuthValidation } from './@interfaces'

export const authValidation: AuthValidation = {
    name: {
        maxLength: {
            value: 25,
            message: 'Имя пользователя не может быть больше 25 символов.'
        },
        minLength: {
            value: 5,
            message: 'Имя пользователя должно содержать не менее 5 символов.'
        }
    },
    email: {
        pattern: {
            value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            message: 'Введите верный Email!'
        }
    },
    password: {
        minLength: {
            value: 5,
            message: 'Пароль должен иметь минимум 5 символов.'
        },
        maxLength: {
            value: 24,
            message: 'Пароль не может быть больше 24 символов.'
        }
    },
    telNumber: {
        pattern: {
            value: /^[+]?[0-9]{1,3}[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4,6}$/,
            message: 'Неправильный номер телефона. Введите: +38(xxx) xxx-xxxx'
        }
    },
    telegram: {
        pattern: {
            value: /^[@]([a-zA-Z0-9_-]*)$/,
            message: 'Неверное имя пользователя(@username).'
        },
        maxLength: {
            value: 26,
            message: 'Имя пользователя не может быть больше 25 символов.'
        },
        minLength: {
            value: 6,
            message: 'Имя пользователя должно содержать не менее 5 символов.'
        }
    },
    facebook: {
        pattern: {
            value: /^(?!.*.(?:com|net))[A-Z0-9.]{5,}$/i,
            message: `Неверное имя пользователя (https://facebook.com/help/105399436216001)`
        },
        minLength: {
            value: 5,
            message: 'Имя пользователя должно содержать не менее 5 символов.'
        }
    },
    linkedIn: {
        pattern: {
            value: /^[\w\-_A-z%]+$/i,
            message: 'Неверное имя пользователя.'
        }
    },
    viber: {
        pattern: {
            value: /^[+]?[0-9]{1,3}[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4,6}$/,
            message: 'Неправильный номер телефона. Введите: +38(xxx) xxx-xxxx'
        }
    },
    whatsApp: {
        pattern: {
            value: /^[+]?[0-9]{1,3}[(]?[0-9]{3}[)]?[\s]?[0-9]{3}[-]?[0-9]{4,6}$/,
            message: 'Неправильный номер телефона. Введите: +38(xxx) xxx-xxxx'
        }
    }
}
