interface Props<Value> {
    value: Value,
    message: string
}

export interface AuthValidation {
    name: {
        maxLength: Props<number>
        minLength: Props<number>
    }
    email: {
        pattern: Props<RegExp>
    }
    password: {
        minLength: Props<number>
        maxLength: Props<number>
    },
    telNumber: {
        pattern: Props<RegExp>
    },
    telegram: {
        pattern: Props<RegExp>
        maxLength: Props<number>
        minLength: Props<number>
    },
    facebook: {
        pattern: Props<RegExp>
        minLength: Props<number>
    },
    linkedIn: {
        pattern: Props<RegExp>
    },
    viber: {
        pattern: Props<RegExp>
    },
    whatsApp: {
        pattern: Props<RegExp>
    }
}
