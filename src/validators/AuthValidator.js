// usando expreess-validator lib de verificacao
const {checkSchema} = require('express-validator')


module.exports = {
    //funcao especifica para fazer cadastro
     //validator cadastro
    signup: checkSchema({
            name: {
                trim:true,
                isLength:{
                    options: {min: 2}
                },
                errorMessage: 'Nome inválido'
            },
            email: {
                isEmail: true,
                normalizeEmail: true,
                errorMessage: 'Email inválido '
            },
            password: {
                isLength: {
                     options: {min: 4},
            },
                errorMessage: "A senha precisa ter no minimo 4 caracteres"
            },
            state: {
                notEmpty: true,
                errorMessage: "Estado não preenchido"
            }
        }),
        //validator login
        signin: checkSchema({
            email: {
                isEmail: true,
                normalizeEmail: true,
                errorMessage: 'Email inválido '
            },
            password: {
                isLength: {
                     options: {min: 4},
            },
                errorMessage: "A senha precisa ter no minimo 4 caracteres"
            }

        })

    }

