'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({ // squema será usado para definir a estrutura dos documentos no banco de dados.
    title:{   // titulo 
        type: String,
        required: true,
        trim: true // remove espaços antes e depois 
    },
    slug: { // item que vai compor URL
        type: String,
        required: true,
        trim: true,
        index: true, // indice para facilitar busca, não tem id pq cria sozinho 
        uinique: true // tem que ser único 
    },
    description: { // descrição do produto 
        type: String,
        required: true,
      },
      price:{ // Representa o preço do produto e é um número obrigatório
        type: Number,
        required: true
      },
      active:{ // vendo se o produto esta ativo ou não 
        type: Boolean,
        required: true,
        default: true
      },
      tags: [{ // É uma lista de strings que representam as tags associadas ao produto
        type: String,
        required: true
      }]

})

module.exports = mongoose.model('Product', schema)