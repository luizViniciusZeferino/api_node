'use strict'

const ValidationContract = require('../validator/fluent.validator')
const repository = require('../repositories/customer-repository')
const md5 = require('md5')

exports.post = async (req, res, next) => {
    let contract = new ValidationContract() // contract existe para diminuir toda a quantidade de if que teria para fazer as validações
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres') // hasMinLen verifica se a string tem o tamanho minimo
    contract.isEmail(req.body.email, 'E-mail inválido')
    contract.hasMinLen(req.body.password, 6, 'A senha deve conter pelo menos 6 caracteres')

    //se os dados forem inválidos
    if(!contract.isValid()) {
        res.status(400).send(contract.errors()).end()
        return
    }
    try {
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY) // incriptando a senha do usuário além de adicionar a senha a salt key
        })
        res.status(201).send({
            messege: 'Cliente cadastrado com sucesso!'
        }) 
    } catch (e) {
        res.status(500).send({
            message: 'Falha ao processar sua requisição'
        })
    }
}