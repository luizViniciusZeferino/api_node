'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({ // schema será usado para definir a estrutura dos documentos no banco de dados.
      name:{   
        type: String,
        required: true, 
      },  
      email:{    
        type: String,
        required: true, 
      },
      password:{    
        type: String,
        required: true, 
      },
      roles: [{ // É uma lista de strings que representam as tags associadas ao produto
        type: String,
        required: true,
        enum:['user', 'admin'],
        default: 'created'
      }]
})

module.exports = mongoose.model('Customer', schema)