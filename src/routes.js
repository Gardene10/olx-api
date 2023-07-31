const express = require('express')
const router = express.Router()
//controllers
const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AdsController = require('./controllers/AdsController')
//ping test
router.get('/ping', (req,res)=> {
    res.json({pong: true})
})
// pegando os states
router.get('/states', UserController.getStates)
// processo de login
router.post('/signin', AuthController.signin)
// processo de cadastro
router.post('/signup', AuthController.signup)
// pegando informaçoes do usuario
router.get('/user/me', UserController.info)
// editando informaçoes do usuario
router.put('/user/me', UserController.editUser)
//listando categorias
router.get('/categories',AdsController.getCategories)
//adicionando um anuncio
router.post('/ad/add', AdsController.addAds)
//listando um anuncio
router.get('/ad/list', AdsController.getAds)
//pegando informacoes de um anuncio especifico
router.get('/ad/item', AdsController.getItem)
//alterando informacoes de um anuncio, por fazer envio de imagens sera ultilizado o post ao inves de put
router.post('/ad/:id', AdsController.editItem)






module.exports = router