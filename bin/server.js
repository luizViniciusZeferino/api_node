const app = require('../src/app'); // importando os módulos com o require 
const debug = require ('debug') ('balta:server');
const http = require('http');

const port = normalizePort (process.env.PORT || '3000'); // acessando a váriavel de ambiente PORT que é definida pela plataforma de hospedagem 
app.set('port', port); // configurando a propriedade port no app 

const server = http.createServer(app); // createServer é um método que aceita como argumento uma função de callback que será chamada sempre que uma requisição HTTP for feita ao servidor

server.listen(port); // listen é um método que faz com que o servidor comece a escutar através de conexões, aceita um ou mais argumento sendo um deles o número da porta em que o servidor deve escutar 
server.on('error', onError);
server.on('listening', onListening); // on é um método para registrar ou vincular funções de retorno de chamada. Recebe dois argumentos: nome do evento e a função de retorno de chamada associada ao evento. 
console.log('API rodando na porta' + port);

function normalizePort(val) { // recebe um valor que representa uma porta (verificando se a porta é um inteiro válido)
    const port = parseInt(val, 10) // converte o valor val para um inteiro 10 é base númerica (decimal)

    if(isNaN(port)) { 
        return val
    }

    if (port >= 0) {
        return port
    }

    return false
}

function onError(error) {   // 

    if(error.syscall !== 'listen') { // verifica se o tipo de chamado do sistema(syscall) associado ao erro não é listen, usado para configurar o servidor para aceitar conexão em determinado endereço e porta
        throw error
    }

    const bind = typeof port === 'string' ? // bind é a descrição do local onde o servirdor está tentando escutar. Se port for string é um pipe caso contrário, assume-se que é um número de porta.
        'Pipe ' + port : 
        'Port ' + port 

    switch (error.code) {
        case 'EACCES' : // EACCES significa que ocorreu um erro de permissão insuficiente 
            console.error(`${bind} requires elevated privileges` )
            process.exit(1)
            break
        case 'EADDRINUSE': // significa que a porta ou pipe do servidor já esta em uso 
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error 
    }
}

function onListening() {
    const addr = server.address() // pegar o enderoço que o servidor está escutando 
    const bind = typeof addr === 'string' // usando o ternário para verificar se addr é string 
    ? 'pipe ' + addr 
    : 'port ' + addr.port 
    debug('Listening on ' + bind) // vai imprimir o endereço em que o servidor está escutando 
}

