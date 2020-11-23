const mongoose = require('mongoose')
module.exports = mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/forentec', {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.Error.messages.general.required = 'O campo "{PATH}" é obrigatório'