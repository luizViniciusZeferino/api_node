'use strict'

const mongoose = require('mongoose') // importando o mongoose também para poder importar o product 
const Product = mongoose.model('Product') // importando o product da pasta models 

exports.get = (req, res, next) => {
    Product
    .find({
        active: true // trazer somente os itens que estão ativos / filtros
    }, 'title price slug') // buscando somento o titulo preço e item / campos que quero trazer
    .then(data => { 
        res.status(200).send(data) // resultado ou 
    }).catch(e => {
        res.status(400).send(e) // erro 
    })
} 

exports.getBySlug = (req, res, next) => { // fazendo um get usando como parametro o Slug do produto 
    Product
    .findOne({ // tras o primeiro documento que atende os critérios de consulta se não trás como array na consulta 
        slug: req.params.slug,
        active: true // trazer somente os itens que estão ativos / filtros
    }, 'title description price slug tags') // buscando somento o titulo preço e item / campos que quero trazer
    .then(data => { 
        res.status(200).send(data) // resultado ou 
    }).catch(e => {
        res.status(400).send(e) // erro 
    })
} 

exports.getById = (req, res, next) => {  
    Product
    .findById(req.params.id)
    .then(data => { 
        res.status(200).send(data) // resultado ou 
    }).catch(e => {
        res.status(400).send(e) // erro      
    })
} 

exports.post = (req, res, next) => {
    let product = new Product(req.body) // instancio com o req.body, tudo que vem na requisição eu passo para o corpo do produto
    product
        .save()
        .then(x => {
            res.status(201).send({
                 messege: 'Produto cadastrado com sucesso!'})
        }).catch(e => {
            res.status(400).send({ 
                messege: 'Falha ao cadastrar produto!',
                data: e })
        }) // salva o item no banco de dados
} 

exports.put = (req, res, next) => {
    const id = req.params.id // forma de recuperar parametros que irão vir pela url 
    res.status (200). send({
        id: id, 
        item: req.body // pegando o corpo da requisição
    });  
} 

exports.delete = (req, res, next) => {
    res.status(201).send(req.body)
} 

