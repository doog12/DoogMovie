const ApiError = require('../exceptions/api-error')

interface Err {
    status: number
    message: string
    errors: any[]
}

module.exports = function(err: any, req: any, res: any, next: any) {
    console.log(err)

    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка сервера', error: err.errors })
}