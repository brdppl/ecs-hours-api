const express = require('express')

module.exports = function(server) {
    // Rotas abertas
    const api = express.Router()
    server.use('/api', api)

    // Email
    const sendMail = require('../api/sendMail')
    api.post('/send-mail', sendMail)
    
    // Arquivos estáticos do front
    server.use(express.static(__dirname + '/../dist'))

    // Client
    server.get('*', function(req, res) {
        res.sendFile(path.join(__dirname+'/../dist/index.html'))
    })
}