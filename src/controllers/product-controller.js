'use strict'

const mongoose = require('mongoose') // importando o mongoose também para poder importar o product 
const Product = mongoose.model('Product') // importando o product da pasta models 
const ValidationContract = require('../validator/fluent.validator')
const repository = require('../repositories/product-repository')

exports.get = (req, res, next) => {
   repository
    .get()
    .then(data => { 
        console.log('Dado certo', data)
        res.status(200).send(data) // resultado ou 
    }).catch(e => {
        res.status(400).send(e) // erro 
    })
} 

exports.getBySlug = (req, res, next) => { // fazendo um get usando como parametro o Slug do produto 
    repository
    .getBySlug(req.params.slug)
    .then(data => { 
        res.status(200).send(data) // resultado ou 
    }).catch(e => {
        res.status(400).send(e) // erro 
    })
} 

exports.getById = (req, res, next) => {  
    repository
    .getById(req.params.id)
    .then(data => { 
        res.status(200).send(data) // resultado ou 
    }).catch(e => {
        res.status(400).send(e) // erro      
    })
} 

exports.getByTag = (req, res, next) => {  
    repository
        .getByTag(req.params.tag)
        .then(data => { 
            res.status(200).send(data) // resultado ou 
        }).catch(e => {
            res.status(400).send(e) // erro      
        })
} 


exports.post = (req, res, next) => {
    let contract = new ValidationContract() // contract existe para diminuir toda a quantidade de if que teria para fazer as validações
    contract.hasMinLen(req.body.title, 3, 'O titulo é obrigatório') // hasMinLen verifica se a string tem o tamanho minimo
    contract.hasMinLen(req.body.slug, 3, 'O slug é obrigatório')
    contract.hasMinLen(req.body.description, 3, 'A descrição é obrigatória')

    //se os dados forem inválidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    repository
        .create(req.body)
        .then(x => {
            res.status(201).send({
                 messege: 'Produto cadastrado com sucesso!'
            })
        }).catch(e => {
            res.status(400).send({ 
                messege: 'Falha ao cadastrar produto!',
                data: e 
        })
    }) // salva o item no banco de dados
} 

exports.put = (req, res, next) => {
    repository
        .update(req.params.id, req.body)
        .then(x => {
            res.status(200).send({
                 messege: 'Produto atualizado com sucesso!'
            })
        }).catch(e => {
            res.status(400).send({ 
                messege: 'Falha ao atualizar produto!',
                data: e 
            })
        })
} 

exports.delete = (req, res, next) => {
    repository.delete(req.body.id)
        .then(x => {
            res.status(200).send({
                messege: 'Produto excluido com sucesso!'
            })
        }).catch(e => {
            res.status(400).send({ 
                messege: 'Falha ao excluir produto!',
                data: e 
        })
    })
}

