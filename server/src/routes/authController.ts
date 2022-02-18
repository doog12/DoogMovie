const { validationResult } = require('express-validator')
const userService = require('../service/user-service')
const ApiErr = require('../exceptions/api-error')


class AuthController {
    async registration(req: any, res: any, next: any) {
        try {
            // Validation
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiErr.BadRequest('Ошибка при валидации', 422, errors.array()))
            }

            // Request Body Destructuring
            const { name, email, password } = req.body

            const userData = await userService.registration(name, email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })

            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req: any, res: any, next: any) {
        try {
            const { email, password } = req.body
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req: any, res: any, next: any) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req: any, res: any, next: any) {
        try {
            const activationLink = req.params.link
            await userService.activation(activationLink)
            return res.redirect(process.env.CLIENT_URL) // redirect to client side
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: any, res: any, next: any) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController()