const express = require('express')
const router = express.Router()
//middleware
const Auth = require('./middlewares/Auth')

//validator usa-se como um middleware
const AuthValidator = require('./validators/AuthValidator')

//controllers
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AdsController = require('./controllers/AdsController')
const UserValidator = require('./validators/UserValidator')
//ping test
router.get('/ping', (req,res)=> {
    res.json({pong: true})
})
// pegando os states
router.get('/states', UserController.getStates)

// processo de login
router.post('/user/signin', AuthValidator.signin,AuthController.signin)
// processo de cadastro + middleware validator
router.post('/user/signup',AuthValidator.signup, AuthController.signup)

// pegando informaçoes do usuario
router.get('/user/me',Auth.private, UserController.info)
// editando informaçoes do usuario
router.put('/user/me',UserValidator.editUser, Auth.private,UserController.editUser)

//listando categorias
router.get('/categories',AdsController.getCategories)

//adicionando um anuncio
router.post('/ad/add', Auth.private,AdsController.addAds)
//listando um anuncio
router.get('/ad/list', AdsController.getAds)
//pegando informacoes de um anuncio especifico
router.get('/ad/item', AdsController.getItem)
//alterando informacoes de um anuncio, por fazer envio de imagens sera ultilizado o post ao inves de put
router.post('/ad/:id', Auth.private,AdsController.editItem)


module.exports = router