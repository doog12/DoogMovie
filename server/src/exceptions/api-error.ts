module.exports = class ApiError extends Error {
    status: number
    errors: any[]

    constructor(status: number, message: string, errors: any[] = []) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Пользователь не авторизован')
    }


    static BadRequest(message: string, status: number = 400, errors: any[] = []) {
        return new ApiError(status, message, errors)
    }

}