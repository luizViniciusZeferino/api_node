'use strict';

const express = require('express')
const bodyParser = require ('body-parser') // converte o conteúdo para json

const app = express()
const router = express.Router()

const indexRoute = require('./routes/index-route') // carregar as rotas
const productRoute = require( './routes/product-route') 

app.use(bodyParser.json()) // conteúdo convertido para JSON 
app.use(bodyParser.urlencoded({extended: false})) // codificar url's

app.use ('/', indexRoute)
app.use ('/products', productRoute)

module.exports = app