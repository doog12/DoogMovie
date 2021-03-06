// @ts-ignore
const User = require('../models/User')
const ObjectID = require('mongoose').Types.ObjectId
const uuid = require('uuid')
const mailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcrypt')
const ApiErrors = require('../exceptions/api-error')
const Config = require('../config/config')
const fs = require('fs')


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
        const userData: TokenPayload | null = tokenService.validateRefreshToken(refreshToken)
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

    async getUser(userId: string) {
        if (!userId) {
            throw ApiErrors.BadRequest('User ID is undefined')
        }

        const userInfo = await User.findById(userId)

        if (!userInfo) {
            throw ApiErrors.BadRequest('Пользователя с таким ID не существует')
        }

        return userInfo
    }


    // ============== USER SETTINGS FUNCTIONS ==============

    async uploadAvatar(file: any, userId: string) {
        const user = await User.findById(userId)
        const avatarName: string = uuid.v4() + ".jpg"
        file.mv(Config.paths.static + "\\avatar\\" + avatarName)
        user.avatar = avatarName
        await user.save()
        return user
    }

    async deleteAvatar(userId: string) {
        const defaultAvatar: string = Config.user.defaultAvatarName
        const staticPath: string = Config.paths.static

        const user = await User.findById(userId)

        if (user.avatar === defaultAvatar) {
            throw ApiErrors.BadRequest('Your avatar is default now. It can\'t be deleted.')
        }

        fs.unlinkSync(staticPath + "\\avatar\\" + user.avatar)
        user.avatar = defaultAvatar

        await user.save()

        return user
    }

    async updateSocialMedia(userId: string, data: Array<Array<string>>): Promise<Object> {
        const id = ObjectID(userId)

        const user = await User.findById(id)
        if (!user) {
            throw ApiErrors.BadRequest('Пользователя с таким email не существует')
        }

        data.forEach(([key, value]: string[]): void => {
            user.socialMedia[key] = value
        })

        await user.save()

        return { socialMedia: user.socialMedia }
    }

    async deleteSocialMedia(userId: string, data: string) {
        const id = ObjectID(userId)

        const user = await User.findById(id)
        if (!user) {
            throw ApiErrors.BadRequest('Пользователя с таким email не существует')
        }

        user.socialMedia[data] = undefined

        await user.save()

        return { socialMedia: user.socialMedia }
    }


}

module.exports = new UserService