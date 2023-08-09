const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const {validationResult, matchedData} = require('express-validator')

const User = require('../models/User') 
const State = require('../models/State')


module.exports = {
  // funcoes de Auth para o controller
    signin: async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        res.json({error: errors.mapped()})
        return
      }
      //validando erros
      const data = matchedData(req)

     //validando o email
      const user = await User.findOne({email: data.email})
      if(!user){
        res.json({error: 'Email ou senha errados'})
        return
      }
       //validando a senha
       const match = await bcrypt.compare(data.password, user.passwordHash)
       if(!match){
        res.json({error: 'Email ou senha errados'})
        return
       }

       const payload = (Date.now()+Math.random()).toString() //mls da hora atual e um numero aleatorio 
       const token = await bcrypt.hash(payload,10) //gerando o token e usando numeros aleatorios

       user.token = token
       await user.save()
       res.json({token, email: data.email}) //retorna o token que foi gerado na criacao do usuario

    },
    signup: async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        res.json({error: errors.mapped()})
        return
      }
      //validando erros
      const data = matchedData(req)
      //verificando se email ja existe
      const user = await User.findOne({
        email: data.email
      })
      if(user){
        res.json({
          error: {email:{msg:'Email já existe!'}}
        }) 
        return
      }
       //verificando se state existe
      if(mongoose.Types.ObjectId.isValid(data.state)){ //usando o mongoose para verificar se e um obj ID valido.
        const stateItem = await State.findById(data.state)
      if(!stateItem){
        res.json({
          error: {state:{msg:'Estado nao existe'}}
        })
        return
      }
      } else {
        res.json({
          error: {state:{msg:'Codigo de Estado invalido! '}}
        })
        return
      }
     //criando a hash do usuario
      const passwordHash = await bcrypt.hash(data.password, 10)
      const payload = (Date.now()+Math.random()).toString()
      const token = await bcrypt.hash(payload,10)

      const newUser = new User ({
        name: data.name,
        email: data.email,
        passwordHash,
        token,
        state: data.state
      })
      await newUser.save()

      res.json({token})

   }
}