'use strict'

const ValidationContract = require('../validator/fluent.validator')
const repository = require('../repositories/product-repository')
const azure = require('azure-storage')
const guid = require('guid')
const config = require('../config')

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
        //Cria o blob service
        const blobsvc = azure.createBlobService(config.containerConnectionString) // criando blob usando a conection string

        let filename = guid.raw().toString() + '.jpg' // criando nome de arquivo unica para imagem a ser salva
        let rawdata = req.body.image 
        let matches = rawdata.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
        
        if (matches && matches.length >= 1) {
            let type = matches[1]
            let buffer = Buffer.from(matches[2], 'base64') // convertendo os dados base64

            // salva a imagem 
        blobsvc.createBlockBlobFromText('product-images', filename, buffer, {
            contentType: type 
        }, function (error, result, response) {
            if (error) {
                filename = 'default-product.png'
            }
        })
        } 
        
        await repository.create({
            title: req.body. title,
            slug: req.body.slug,
            description: req.body.description,
            price: req.body.price,
            active: true,
            tags: req.body.tags,
            image: 'https://nodestore1.blob.core.windows.net/product-images/' + filename 
        })
        res.status(201).send({
            messege: 'Produto cadastrado com sucesso!'
        }) 
    } catch (e) {
        console.log(e)
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