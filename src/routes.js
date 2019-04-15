const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router(); // Rotas estão separadas do módulo principal que é o server.js

const BoxController = require("./controllers/BoxController"); // Aqui importamos um módulo que recebe um 'new Classe()' ou seja a instancia de uma classe como se fosse um Classe classe = new Classe();
const FileController = require("./controllers/FileController"); // Aqui importamos um módulo que recebe um 'new Classe()' ou seja a instancia de uma classe como se fosse um Classe classe = new Classe();

routes.post("/boxes", BoxController.store); // Aqui faremos um post (Rest) com o método da classe que envia um Json para o cliente
routes.get("/boxes/:id", BoxController.show); // Cria uma rota de get para buscar e visualizar o item inserido

routes.post("/boxes/:id/files", multer(multerConfig).single("file"), FileController.store); // Observe o caminho, no '/:id' está dizendo para o "express" que o metodo esta linha está esperando um parametro do usuário 
/*
routes.get('/teste', (req, res) => { // Definiremos para a rota '/teste' a "ArrowFunction" servirá como middleware, interceptando a rota e fazendo alguma coisa, neste caso enviando a mensagem 'Hello World'. Utiliza 'Req e Res' (Request Response)
    return res.send('Hello World');
})
*/
module.exports = routes; // Isto exporta alguma informação, neste caso a variavel routes. Obs: Geralmente se usa somente um module.exports por arquivo.