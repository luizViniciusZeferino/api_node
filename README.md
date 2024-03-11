## Descrição

O projeto consiste em uma API REST feita com JavaScript, usando Node.Js utilizando Express, o ORM utilizado é o Mongoose com o banco de dados MongoDB. A autenticação é feita usando JWT, os hashes são gerados com MD5 (Message Digest Algorithm 5) e os UUIDs são gerados com Guid. O objetivo da aplicação é ser backend de um sistema simples de vendas.

## Tecnologias Usadas 

> Developed using: Node.js, Mongoose, Express, MongoDB, Guid, MD5 e JWT.

## Instalando Dependências

npm install --save

## Rodando a Aplicação

npx nodemon .\bin\server.js

 ## Documentação
### Usuário
* Tipo: POST
* Rota: /customers
* Body: {"name": "exemploNome", "email": "exemploEmail", "password": "exemploPassword"}
#
* Tipo: Post
* Rota: /customers/authenticate
* Body: {"email": "exemploEmail", "password": "exemplopassword"}
#

* Tipo: Post
* Rota:  /customers/refresh-token
* Header:
* * key: x-access-token
* * value: <aqui dentro vai o token que foi gerado pelo /customers/authenticate>
#
### Produto
* Tipo: Get
* Rota:  /products

#
* Tipo: Get
* Rota:  /products/{valorSlug}
#
* Tipo: Get
* Rota:  /products/admin/{valorId}
#
* Tipo: Get
* Rota:  /products/tags/{valorTag}
#
* Tipo: Post (Somente para admin)
* Rota:  /products 
*  Body: "title": "exemploTitle",  "slug": "exemploSlug", "description": "exemploDescription", "price": exemploPrice, "tags": ["ExemploTag1", "ExemploTag2"], "image": "URlImage64""
#
* Tipo: Put (Somente para admin)
* Rota:  /products/(IdDoProduto)
#
* Tipo: Delete (Somente para admin)
* Rota:  /product
* Body: "id": "idProduto"
### Pedido
* Tipo: Post
* Rota: /orders
* Body: "items": {"quantity":exemploQuantidade, "price": ezemploPreco, "product": "idProduto" }
#
* Tipo: Get
* Rota: /orders





