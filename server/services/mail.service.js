
const nodemailer = require('nodemailer');

const JWTService = require('./jwt.service');

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

class MailService {
    static async sendConfirmation(to, id) {
        const token = JWTService.generateToken(id);

        const mailOptions = {
            to,
            from: process.env.NODEMAILER_USER,
            subject: 'Email confirmation',
            html: `<a href='http://localhost:3000/users/confirm-email/${token}'>Click here for confirmation your email.</a>`,
        };

        await transporter.sendMail(mailOptions);
    }
}

module.exports = MailService;
