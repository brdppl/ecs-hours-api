const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

module.exports = router.post('/send-mail', (req, res, next) => {
    let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    const body = `
        ${req.body.hours.map(el => {
            return `
                <p>${el.day}</p>
                <p>${el.hours.join(',').replace(/,/g, ' - ').split()}</p>
            `
        }).join(',').replace(/,/g, '').split()}
    `
    
    let mailOptions = {
        from: req.body.email,
        to: process.env.DESTINATION,
        subject: 'Horários',
        html: body
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({
                status: false,
                msg: 'O e-mail não pôde ser enviado, tente novamente'
            })
            return console.log(error)
        } else {
            res.json({
                status: true,
                msg: 'E-mail enviado com sucesso!'
            })
            // console.log('Message %s sent: %s', info.messageId, info.response)
            console.log('info', info)
        }
    })
})