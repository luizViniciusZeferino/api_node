'use strict';

const express = require('express') // framework web p/ node.js
const bodyParser = require ('body-parser') // converte o conteúdo para json
const mongoose = require('mongoose') // instancia do mogoose 
const config = require('./config')

const app = express() // instancia do express criada e atribuida a vairiavel 
const router = express.Router() // Este roteador pode ser usado para organizar e modularizar as rotas da aplicação.

mongoose.connect(config.connectionString) 

const product = require('./models/product')
const Customer = require('./models/customer')
const Order = require('./models/order')

const indexRoute = require('./routes/index-route') // importando as rotas 
const productRoute = require( './routes/product-route') 
const customerRoute = require( './routes/customer-route')
const orderRoute = require( './routes/order-route')

app.use(bodyParser.json({limit: '5mb'})) // o limitie do corpo do json que vou receber será limitado em 5 megas
app.use(bodyParser.urlencoded({extended: false})) // codificar url's

// Habilita o CORS (Cross-Origin Resource Sharing)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
});

app.use ('/', indexRoute) // rotas associadas ao aplicativo axpress  
app.use ('/products', productRoute)
app.use ('/customers', customerRoute) // as rotas definidas nos módulos importados estarão acessiveis nos caminhos correspondentes. 
app.use ('/orders', orderRoute)

module.exports = app