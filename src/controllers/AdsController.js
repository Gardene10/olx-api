//usando o model no controller
const Category = require('../models/Category')
const User = require('../models/User')
const Ad = require('../models/Ad')

module.exports = {
    // funcoes de Ads para o controller
    getCategories: async (req, res) => {
        const cats = await Category.find()
        // listando as acategorias
        let categories = []
        for (let i in cats){
            categories.push({
                ...cats[i]._doc,
                img: `${process.env.BASE}/assents/images/${cats[i].slug}.png`
            })
        }

        res.json({categories})
    },
    addAds: async (req, res) => {
        let {title, price, priceneg, desc, cat, token} = req.body
        const user = User.findOne({token}).exec()

        if(!title || !cat){
            res.json({error: 'Titulo ou Categoria não preenchidos'})
            return
        }
        if(price){//padrao brasil R$ 8.000,35  => padrao internacional 8000.35
            price = price.replace('.','').replace('.','.').replace('R$ ','')
            price = parseFloat(price)
        }else {
            price = 0
        }

        const newAdd = new Ad()
        newAdd.status = true
        newAdd.idUser = user._id
        newAdd.state = user.state
        newAdd.dateCreated = new Date()
        newAdd.title = title
        newAdd.category  = cat
        newAdd.priceNegotiable = (priceneg=='true') ? true : false
        newAdd. description = desc
        newAdd.views = 0


    },
    getAds: async (req, res) => {

    },
    getItem: async (req, res) => {

    },
    editItem:  async (req, res) => {

    }
}