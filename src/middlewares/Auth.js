
//usando o model que contem as informacoes necessarias
const User = require('../models/User')
module.exports = {
    private: async (req,res,next) =>{
        // se nao existe parametro nem na query nem no body return
        if(!req.query.token && !req.body.token){
            res.json({notAllowed: true})
            return
        }

        let token = ''
        if (req.query.token){
            token = req.query.token
        }
        if (req.body.token){
            token = req.body.token
        }
        //verifica se foi preenchido os dados
        if (token = ''){
            res.json({notAllowed: true})
            return
        }

        const user = await User.findOne({token})

        if(!user){
            res.json({notAllowed: true})
            return
        }
        //verifica se e um dado valido
           

        next()

    }
    
}