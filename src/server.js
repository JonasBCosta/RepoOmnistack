const express = require("express"); // Constante que busca a biblioteca 'express' instalada no app (dentro de node_modules onde estão as dependencias da aplicação)
const app = express(); // Constante principal da aplicação (guardará todas as informações da aplicação) e chamará a função (biblioteca) express 
const mongoose = require("mongoose"); // Importa também a biblioteca 'mongoose' instalada no app
// Mongoose é uma biblioteca do MongoDB, é um ODM (Object Document Mapper), feito para nós podermos utilizar apenas código javascript para manipular o cluster e o DB do MongoDB 
const server = require("http").Server(app); // Criamos uma variável de servidor http passando nossa "app" como parametro.
const io = require("socket.io")(server); // Socket é uma lib que faz requisições no formato "WebSocket" e não no formato http. Importaremos a função IO direto para a constante "io", invés de importar "Socket" como lib. Também já passamos para a função a variavel "server"
// Desta forma nossa aplicação pode trabalhar com requisições http e websocket. (Por padrão usaria apenas http, se usassemos a variavel 'app' direto nas chamadas)
const cors = require("cors"); // Cors é um módulo que determina quem vai poder acessar nossa aplicação, sem ele, o front-end não conseguirá acessar o back-end estando em um domínio diferente
const path = require("path");

app.use(cors()); // Deixando assim qualquer um poderá acessar a aplicação, mas pode ser configurado
// ... Utilizaremos o site heroku.com para acessar
//...
//...
// O que acontecerá abaixo:
// 1-> Quando o usuário utilizar a aplicação, a mesma receberá uma conexão "socket" que representa a conexão do usuário com o "realtime" (este servidor)
// 2-> A requisição que chegar do front-end chamada "connectRoom", utilizando a id "box"
// 3-> O socket fará um join para uma sala isolada pela id
io.on("connection", socket => { // com a variavel io, poderemos usar websocket. Obs: WebSocket só poderá ser testada com a interface da aplicação, não com o Imnsomnia por exemplo.
    // Com o WebSocket poderemos criar "rooms", criando divisões entre clientes, ou seja, quando um cliente subir um arquivo, outro cliente não tera acesso.
    socket.on("connectRoom", box => { // "box" é o id da box
        socket.join(box);
    })
});

app.use((req, res, next) => {
    req.io = io; // Aqui está pegando a conexão io para dentro da aplicação (seu estado também). (Veja esta variavel sendo usada em FileController)
    return next(); // Aqui quando se usa um return, a aplicação retorna uma informação para o usuário e para. Com o next(), a aplicação continua rodando.
});

mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-f8a34.mongodb.net/omnistack?retryWrites=true", {  
    useNewUrlParser: true // Diz para o MongoDB que estamos usando um tipo novo de URL
});

app.use(express.json()); // Cadastra um módulo (MiddleWare) dentro do express, para o servidor receber e entender dados de alguma fonte no formato JSON (JavaScriptObjectNotation). JSON é muito utilizado em API's Rest

app.use(express.urlencoded({ extended: true})); // UrlEncoded (outro Módulo/Middleware) permite o envio de arquivos nas requisições (JSON não permite envio de arquivos)

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require("./routes")); // Cria uma rota da raiz './' para o arquivo "routes.js" Obs: se retirar o caminho relativo './' esta função achará que é para importar algum módulo do arquivo "routes".

// app.listen(3333); // Porta que a aplicaçao irá usar
app.listen(process.env.PORT || 3333); // process.env.PORT é uma variável ambiente, utilizada para ser editavel dependendo do ambiente que está sendo executada, aqui vamos usar esta variavel OU 3333, se não estiver sendo utilizada será utilizado 3333. O Heroku utilizara esta porta.
//process (?) env (Variaveis ambiente) PORT (nome da variável, que é definida automaticamente pelo heroku)


