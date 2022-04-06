const apiError = require('../exceptions/api-error')

const tokenServices = require('../service/token-service')

function AuthMiddleware(req: any, res: any, next: any) {
    try {
        const authorizationHeader: string = req.headers.authorization
        if (!authorizationHeader) {
            return next(apiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(' ')[1]
        if (!accessToken) {
            return next(apiError.UnauthorizedError())
        }

        const userData = tokenServices.validateAccessToken(accessToken)
        if (!userData) {
            return next(apiError.UnauthorizedError())
        }

        req.user = userData
        next()
    } catch(e) {
        return next(apiError.UnauthorizedError())
    }

}

module.exports = AuthMiddleware