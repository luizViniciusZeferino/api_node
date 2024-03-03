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