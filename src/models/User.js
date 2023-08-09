//
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const modelSchema = new mongoose.Schema({
    name: String,
    email: String,
    state : String,
    passwordHash: String,
    token: String
})

const modelName = 'User'

if(mongoose.connection && mongoose.connection.models[modelName]){ //se o model estiver pronto para conexao ele exporta 
    module.exports = mongoose.connection.models[modelName]
}else {
    module.exports = mongoose.model(modelName,modelSchema) //se nao cria-se e exporta
}