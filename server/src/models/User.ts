// @ts-ignore
const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, requied: true, unique: true },
    password: { type: String, required: true },
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String}
})

module.exports = model('User', UserSchema)