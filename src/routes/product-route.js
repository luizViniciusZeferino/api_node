'use strict';

const express = require('express')
const router = express.Router()

router.post('/', (req, res, next) => {
    res.status (201). send (req.body); // pegando o corpo da requisição 

});

router.put('/:id', (req, res, next) => { // parâmetro id 
    const id = req.params.id // forma de recuperar parametros que irão vir pela URL 
    res.status (200). send({
        id: id, 
        item: req.body
    }); // pegando o corpo da requisição 
});

router.delete('/', (req, res, next) => {
    res.status (200). send (req.body); // pegando o corpo da requisição 

});

module.exports = router 


/*
const route = router.get('/', (req, res, next) => { // req requisição http, res resposta http, next  permite a passagem do controle para o próximo middleware
    res.status (200). send ({ // enviado uma resposta 
        title: "Node Store API", 
        version: "0.0.1"
    })
});*/