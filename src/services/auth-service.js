'use strict';
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => { // dados que quero inputar no token 
    return jwt.sign(data, global.SALT_KEY, { expiresIn: '1d' }); // expiresIn seria o tempo de expiração do token
}

exports.decodeToken = async (token) => { 
    let data = await jwt.verify(token, global.SALT_KEY); // Tento verificar o token 
    return data;
}

exports.authorize = function (req, res, next) { // serve como interceptador "blouquear rotas do usuário"
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        res.status(401).json({
            message: 'Acesso Restrito'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) { // caso ache o token ele faz o processon para verificar o token 
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido'
                });
            } else {
                next();
            }
        });
    }
};

exports.isAdmin = function (req, res, next) { // verificando se usuário é admin 
    let token = req.body.token || req.query.token || req.headers['x-access-token']; // recebo token

    if (!token) {
        res.status(401).json({ // se nao tiver token erro 401 
            message: 'Token Inválido'
        });
    } else {
        jwt.verify(token, global.SALT_KEY, function (error, decoded) {
            if (error) {
                res.status(401).json({
                    message: 'Token Inválido' // se nao conseguir desencriptar o token 
                });
            } else {
                if (decoded.roles.includes('admin')) { // para saber se uma string esta dentro de um array 
                    next();
                } else {
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    });
                }
            }
        });
    }
};