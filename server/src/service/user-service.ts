// @ts-ignore
const User = require('../models/User')
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')
const ApiErrors = require('../exceptions/api-error')


class UserService {
    async registration(name: string, email: string, password: string) {
        // Check for duplicate E-mail
        const candidate = await User.findOne({ email })
        if (candidate) {
            throw ApiErrors.BadRequest('Пользователь с таким email уже существует')
        }

        // Hashing Password
        const hashedPassword: string = await bcrypt.hashSync(password, 7)
        const activationLink: string = uuid.v4()
        // new User
        const user = await User.create({ name, email, password: hashedPassword, activationLink })

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user) // id, email, name, isActivated
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    // Activation Link Service
    async activation(activationLink: string) {
        const user = await User.findOne({ activationLink })
        if (!user) {
            throw ApiErrors.BadRequest('Неккоректная ссылка активации')
        }

        user.isActivated = true
        await user.save()
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email })
        if (!user) {
            throw ApiErrors.BadRequest('Пользователя с таким email не существует')
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiErrors.BadRequest('Неверный пароль')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async logout(refreshToken: string) {
        const token: any = tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw ApiErrors.UnauthorizedError()
        }
        const userData: {id: number} = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDB) {
            throw ApiErrors.UnauthorizedError()
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService