const jwt = require('jsonwebtoken')
const Token = require('../models/TokenModel')


interface TokenGenerator {
    accessToken: string,
    refreshToken: string
}

interface TokenPayload {
    email: string,
    id: string,
    name: string,
    isActivated: boolean
}

class TokenService {
    generateTokens(payload: TokenPayload): TokenGenerator {
        const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: "1h" })
        const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d" })

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: number | string, refreshToken: string) {
        const tokenData = await Token.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        Token.create({ user: userId, refreshToken })
    }

    async removeToken(refreshToken: string) {
        const tokenData: object = await Token.deleteOne({ refreshToken })
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            const userData: TokenPayload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData: TokenPayload = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }

    async findToken(refreshToken: string) {
        const tokenData: object | string = await Token.findOne({ refreshToken })
        return tokenData
    }
}

module.exports = new TokenService()