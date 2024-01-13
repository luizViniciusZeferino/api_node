'use strict';

const express = require('express') // framework web p/ node.js
const bodyParser = require ('body-parser') // converte o conteúdo para json

const app = express() // instancia do express criada e atribuida a vairiavel 
const router = express.Router() // Este roteador pode ser usado para organizar e modularizar as rotas da aplicação.

const indexRoute = require('./routes/index-route') // importando as rotas 
const productRoute = require( './routes/product-route') 

app.use(bodyParser.json()) // conteúdo convertido para JSON 
app.use(bodyParser.urlencoded({extended: false})) // codificar url's

app.use ('/', indexRoute) // rotas associadas ao aplicativo axpress  
app.use ('/products', productRoute) // as rotas definidas nos módulos importados estarão acessiveis nos caminhos correspondentes. 

module.exports = app