'use district' // deixa o JS mais criterioso

// importando módulos
const http = require ('http') // servidor web   
const debug = require ('debug') ('Balta_ApiNode:server') // para debugar o código 
const express = require ('express') // usar mvc 

const app = express() // const app recebe express importando a cima 
const port = normalizePort(process.env.PORT || '3000')
app.set ('port', port)


const server = http.createServer(app) // criando o servidor baseado na app que veio do express 
const router = express.Router() // arquivo de rotas URL 

let route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node Store API",
        version: "0.0.1"
    })
})
app.use('/', route) 

server.listen(port)
console.log(`API rodando na porta ${port}`)

function normalizePort(val) { // recebe um valor que representa uma porta 
    const port = parseint(val, 10) // converte o valor val para um inteiro 10 é base númerica (decimal)

    if(isNaN(port)) { 
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}