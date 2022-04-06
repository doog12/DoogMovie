const { Router } = require('express')
const authMiddleware = require('../middleware/auth-middleware')
const router = Router()
import { check } from "express-validator"

const controller = require('./authController')

router.post('/registration', [
    check('name', 'Имя должно содержать более двух символов!').exists().trim().escape(),
    check('email', 'Введите верный Email!').isEmail().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
    check('password', 'Пароль должен иметь минимум 5 символов!').exists().isLength({ min: 5, max: 24 })
], controller.registration)
router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.post('/upload_avatar', authMiddleware, controller.uploadAvatar)

router.get('/activate/:link', controller.activate)
router.get('/refresh', controller.refresh)
router.get('/get_user', controller.getUser)

router.delete('/delete_avatar', authMiddleware, controller.deleteAvatar)

module.exports = router