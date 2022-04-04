// @ts-ignore
const { Schema, model } = require('mongoose')

const configFile = require('../config/config')

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    avatar: {type: String, default: configFile.user.defaultAvatarName}
})

module.exports = model('User', UserSchema)