'use strict'

const router = require("../routes/product-route")

exports.post = (req, res, next) => {
    res.status(201).send(req.body)
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

