'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.create = async(data) => {
    let customer = new Customer(data) // instancio com o req.body, tudo que vem na requisição eu passo para o corpo do produto
    await customer.save()
}