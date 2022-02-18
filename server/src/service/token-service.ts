const jwt = require('jsonwebtoken')
const Token = require('../models/TokenModel')

const JWT_ACCESS_SECRET: string = "" + process.env.JWT_ACCESS_SECRET
const JWT_REFRESH_SECRET: string = "" + process.env.JWT_REFRESH_SECRET

interface TokenGenerator {
    accessToken: string,
    refreshToken: string
}

class TokenService {
    generateTokens(payload: any): TokenGenerator {
        const accessToken: string = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "1h" })
        const refreshToken: string = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" })

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
        const tokenData: object | string = await Token.deleteOne({ refreshToken })
        return tokenData
    }

    validateAccessToken(token: string) {
        try {
            const userData: object | string = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch(e) {
            return null
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData: object | string = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
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