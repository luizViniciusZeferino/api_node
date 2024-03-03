'use strict'

const mongoose = require('mongoose')
const Customer = mongoose.model('Customer')

exports.create = async(data) => {
    let customer = new Customer(data) // instancio com o req.body, tudo que vem na requisição eu passo para o corpo do produto
    await customer.save()
}

exports.authenticate = async(data) => {
    const res = await Customer.findOne({ // await é para aguardar a execução do product.find
        email: data.email, 
        password: data.password    
    }) 
    return res
}

exports.getById = async(id) => {
    const res = await Customer.findById(id);
    return res;
}