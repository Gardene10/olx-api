//usando o model no controller
const Category = require('../models/Category')

module.exports = {
    // funcoes de Ads para o controller
    getCategories: async (req, res) => {
        const cats = await Category.find()

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

    },
    getAds: async (req, res) => {

    },
    getItem: async (req, res) => {

    },
    editItem:  async (req, res) => {

    }
}