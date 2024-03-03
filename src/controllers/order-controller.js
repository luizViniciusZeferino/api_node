'use strict'

const repository = require('../repositories/order-repository')
const guid = require('guid')
const md5 = require('md5')
const authService = require('../services/auth-service')

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

exports.post = async (req, res, next) => {
    try {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];  // recupera o token
        const data = await authService.decodeToken(token); // decodifica o token

        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items // incriptando a senha do usuário além de adicionar a senha a salt key
        });
        res.status(201).send({
            message: 'Pedido cadastrado com sucesso!'
        }); 
    } catch (e) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}