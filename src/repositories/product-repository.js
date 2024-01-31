'use strict'

// padrão repository pattern 

const mongoose = require('mongoose')
const Product = mongoose.model('Product')

exports.get = async() => {
    const res = await Product.find({ // await é para aguardar a execução do product.find
        active: true 
    },'title price slug') 
    return res
}

exports.getBySlug = async(slug) => { // fazendo um get usando como parametro o Slug do produto 
    const res = await Product
        .findOne({ // tras o primeiro documento que atende os critérios de consulta se não trás como array na consulta  
            slug: slug,
            active: true // trazer somente os itens que estão ativos / filtros
        }, 'title description price slug tags') // buscando somento o titulo preço e item / campos que quero trazer
    return res
}

exports.getById = async(id) => {  
    const res = await Product
        .findById(id)
    return res
}

exports.getByTag = async(tags) => {  
    const res = Product
        .find({
            tags: tags,
            active: true
        })
    return res 
} 

exports.create = async(data) => {
    let product = new Product(data) // instancio com o req.body, tudo que vem na requisição eu passo para o corpo do produto
    await product.save()
}

exports.update = async(id, data) => {
    await Product
        .findByIdAndUpdate(id, {
            $set: { // setar oque veio da requisição p/ oque vair ser alterado
                title: data.title,
                description: data.description,
                price: data.price,
                slug: data.slug
            }
        })
}

exports.delete = async(id) => {
    await Product
    .findByIdAndDelete(id)
}