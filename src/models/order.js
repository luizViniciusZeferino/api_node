'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({ // schema será usado para definir a estrutura dos documentos no banco de dados.
      customer:{    
        type: mongoose.Schema.Types.ObjectId, // para referenciar um cliente
        ref: 'Customer', 
      },  
      number:{   
        type: String,
        required: true, 
      },  
      createDate: {
        type: Date,
        required: true,
        default: Date.now
      },
      status:{   
        type: String,
        required: true,
        enum: ['created', 'done'], // só pode receber o created e done 
        default: 'created'
      },
      items:[{    
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        },
        product:{    
            type: mongoose.Schema.Types.ObjectId, //para referenciar um cliente
            ref: 'Product', 
          },  
      }],
})

module.exports = mongoose.model('Order', schema)