'use strict'

const mongoose = require('mongoose')
const Order = mongoose.model('Order')

exports.get = async(data) => {
    let res = await Order
    .find({}, 'number status customer items')
    .populate('customer', 'name') // . populate para trazer preenchido o customer na requisição
    .populate('items.product', 'title')  // tras o product preenchido
    return res
}

exports.create = async(data) => {
    let order = new Order(data) // instancio com o req.body, tudo que vem na requisição eu passo para o corpo do produto
    await order.save()
}