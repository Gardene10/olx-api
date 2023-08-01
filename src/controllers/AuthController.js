
const { json } = require('express')
const {validationResult, matchedData} = require('express-validator')

module.exports = {
  // funcoes de Auth para o controller
    signin: async (req, res) => {

    },
    signup: async (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        res.json({error: errors.mapped()})
        return
      }
      const data = matchedData(req)
      
      res.json({tudook: true, data: data})

    }


}