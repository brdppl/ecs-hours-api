const express = require('express')

module.exports = function(server) {
    // Rotas abertas
    const api = express.Router()
    server.use('/api', api)

    // Email
    const sendMail = require('../api/sendMail')
    api.post('/send-mail', sendMail)

    // Redirecionamento HTTPS
    server.use((req, res, next) => {
        if ((req.headers['x-forwarded-proto'] || '').endsWith('http')) {
            res.redirect(`https://${req.hostname}${req.url}`)
        } else {
            next()
        }
    })
    
    // Arquivos estáticos do front
    server.use(express.static(__dirname + '/../dist'))

    // Client
    server.get('*', function(req, res) {
        res.sendFile(path.join(__dirname+'/../dist/index.html'))
    })
}