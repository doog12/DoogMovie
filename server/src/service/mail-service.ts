const nodemailer = require('nodemailer')
const cfg = require('../config/config')
require('dotenv').config();

class MailService {
    transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: cfg.site_name,
            to,
            subject: 'Активация аккаунта на ' + cfg.site_name,
            text: '',
            html:
                `
                    <div>
                        <h1 style='font-weight: 700'>${cfg.site_name}</h1>
                        <h3 style="color: #818181">${cfg.site_description}</h3>
                        <hr style="color: rgba(173,173,173,0.71)" />

                        <h3>Для активации аккаунта перейдите по ссылке:</h3>
                        <a href='${link}'>${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService()