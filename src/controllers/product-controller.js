'use strict'

const mongoose = require('mongoose') // importando o mongoose também para poder importar o product 
const Product = mongoose.model('Product') // importando o product da pasta models 
const ValidationContract = require('../validator/fluent.validator')
const repository = require('../repositories/product-repository')

exports.get = async(req, res, next) => {
    try {
        let data = await repository.get()
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
} 

exports.getBySlug = async (req, res, next) => {
    try {
        let data = await repository.getBySlug(req.params.slug)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getById = async (req, res, next) => {  
    try {
        let data = await repository.getById(req.params.id)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.getByTag = async (req, res, next) => {  
    try {
        let data = await repository.getByTag(req.params.tag)
        res.status(200).send(data)
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}    
   
    
exports.post = async (req, res, next) => {
    let contract = new ValidationContract() // contract existe para diminuir toda a quantidade de if que teria para fazer as validações
    contract.hasMinLen(req.body.title, 3, 'O titulo é obrigatório') // hasMinLen verifica se a string tem o tamanho minimo
    contract.hasMinLen(req.body.slug, 3, 'O slug é obrigatório')
    contract.hasMinLen(req.body.description, 3, 'A descrição é obrigatória')

    //se os dados forem inválidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    try {
        await repository.create(req.body)
        res.status(201).send({
            messege: 'Produto cadastrado com sucesso!'
        }) 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}

exports.put = async(req, res, next) => {
       try {
            await repository.update(req.params.id,req.body)
            res.status(200).send({
                messege: 'Produto atualizado com sucesso!'
            })
        } catch (e) {
            res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }    
}   

exports.delete = async(req, res, next) => {
    try{
        await repository.delete(req.body.id)
        res.status(200).send({
            messege: 'Produto excluido com sucesso!'
        })    
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}