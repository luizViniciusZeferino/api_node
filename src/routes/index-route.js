'use strict';

const express = require('express')
const router = express.Router()

const route = router.get('/', (req, res, next) => { // req requisição http, res resposta http, next  permite a passagem do controle para o próximo middleware
    res.status (200). send ({ // enviado uma resposta 
        title: "Node Store API", 
        version: "0.0.1"
    })
});

module.exports = router 

