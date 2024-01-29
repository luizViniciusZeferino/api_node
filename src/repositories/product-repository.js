'use strict'

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = () => {
    return Product
        .find({
          active: true // trazer somente os itens que estão ativos / filtros
        },'title price slug') // buscando somento o titulo preço e item / campos que quero trazer
}

exports.getBySlug = (slug) => { // fazendo um get usando como parametro o Slug do produto 
    return Product
        .findOne({ // tras o primeiro documento que atende os critérios de consulta se não trás como array na consulta 
            slug: slug,
            active: true // trazer somente os itens que estão ativos / filtros
        }, 'title description price slug tags') // buscando somento o titulo preço e item / campos que quero trazer
}

exports.getById = (id) => {  
    return Product
        .findById(id)
}

exports.getByTag = (tags) => {  
    return Product
    .find({
        tags: tags,
        active: true
    })
}

exports.create = (data) => {
    let product = new Product(data) // instancio com o req.body, tudo que vem na requisição eu passo para o corpo do produto
        return product.save()
}

exports.update = (id, data) => {
    return Product
    .findByIdAndUpdate(id, {
        $set: { // setar oque veio da requisição p/ oque vair ser alterado
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    })
}

exports.delete = (id) => {
    return Product
        .findByIdAndDelete(id)
}