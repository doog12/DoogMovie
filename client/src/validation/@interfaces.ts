export interface AuthValidation {
    name: {
        required: string | boolean
        minLength: {
            value: number
            message: string
        }
    }
    email: {
        required: string | boolean
        pattern: {
            value: RegExp
            message: string
        }
    }
    password: {
        required: string | boolean
        minLength: {
            value: number
            message: string
        }
        maxLength: {
            value: number
            message: string
        }
    }
}
