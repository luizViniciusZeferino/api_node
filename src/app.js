'use strict';

const express = require('express')
const bodyParser = require ('body-parser') // converte todo o conteúdo para json

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false})) // codificar url's

const route = router.get('/', (req, res, next) => { // req requisição http, res resposta http, next  permite a passagem do controle para o próximo middleware
    res.status (200). send ({
        title: "Node Store API", 
        version: "0.0.1"
    })
});

const create = router.post('/', (req, res, next) => {
    res.status (201). send (req.body); // pegando o corpo da requisição 

});

const put = router.put('/:id', (req, res, next) => { // parâmetro id 
    const id = req.params.id // forma de recuperar parametros que irão vir pela URL 
    res.status (200). send({
        id: id, 
        item: req.body
    }); // pegando o corpo da requisição 
});

const del = router.delete('/', (req, res, next) => {
    res.status (200). send (req.body); // pegando o corpo da requisição 

});

app.use ('/', route)
app.use ('/products', create)
app.use ('/products', put)

module.exports = app