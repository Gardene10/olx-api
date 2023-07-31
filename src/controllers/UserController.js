//pegando o model necesssario para usar na funçao
const State = require('../models/State')

module.exports = {
    // funcoes do usuario para o controller
    getStates: async (req, res) => {
        let states = await State.find()
        res.json({states})

    },
    info: async (req, res) => {

    },
    editUser:  async (req, res) => {

    }
    
}
