const {v4: uuid} = require('uuid') // lib p gerar numero aleatorio
const jimp  = require('jimp') // lib para tratar a imagem recebida

//usando o model no controller
const Category = require('../models/Category')
const User = require('../models/User')
const Ad = require('../models/Ad')
//funcao para pegar o buffer da imagem e manipular e salvar

const addImage = async (buffer) => {
    let newName = `${uuid()}.jpg`;
    let tmpImg = await jimp.read(buffer);
    tmpImg.cover(500,500).quality(80).write(`./public/media/${newName}`);
    return newName;
  };

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
        let { title, price, priceneg, desc, cat, token } = req.body;
        const user = await User.findOne({token}).exec();
        if(!title || !cat){
          res.json({error: 'Titulo e/ou Categora não foi enviado.'})
        }
        if(price){
          price = price.replace('.', '').replace(',','.').replace('R$ ', '');
          price = parseFloat(price);
        } else {
          price = 0;
        }
       
        const newAd = new Ad();
        newAd.status = true;
        newAd.idUser = user._id;
        newAd.state = user.state;
        newAd.dataCreated = new Date();
        newAd.title = title;
        newAd.category = cat;
        newAd.price = price;
        newAd.priceNegotiable = (priceneg == 'true') ? true : false;
        newAd.description = desc;
        newAd.views = 0;
    
        if(req.files && req.files.img){
          if(req.files.img.length == undefined){
            if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img.mimetype)){
              let url = await addImage(req.files.img.data);
              newAd.images.push({
                url,
                default: false
              })
            }
          } else{
            for(let i = 0; i < req.files.img.length; i++){
              if(['image/jpeg', 'image/jpg', 'image/png'].includes(req.files.img[i].mimetype)){
                let url = await addImage(req.files.img[i].data);
                newAd.images.push({
                  url,
                  default: false
                })
              }
            }
          }
        }
       
    
        if(newAd.images.length > 0){
          newAd.images[0].default = true;
        }
    
        const info = await newAd.save();
        res.json({newAd});
    
      },
    getAds: async (req, res) => {

    },
    getItem: async (req, res) => {

    },
    editItem:  async (req, res) => {
    }
}