// usando expreess-validator lib de verificacao
const {checkSchema} = require('express-validator')


module.exports = {
    //funcao especifica para fazer cadastro
     //validator cadastro
     editUser: checkSchema({
            token:{
                notEmpty:true
            },
            name: {
                optional: true,
                trim:true,
                isLength:{
                    options: {min: 2}
                },
                errorMessage: 'Nome inválido'
            },
            email: {
                optional: true,
                isEmail: true,
                normalizeEmail: true,
                errorMessage: 'Email inválido '
            },
            password: {
                optional: true,
                isLength: {
                     options: {min: 4},
            },
                errorMessage: "A senha precisa ter no minimo 4 caracteres"
            },
            state: {
                optional: true,
                notEmpty: true,
                errorMessage: "Estado não preenchido"
            }
        })

    }

