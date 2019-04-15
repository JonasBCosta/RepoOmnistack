const File = require("../models/File"); // Importando os models de File
const Box = require("../models/Box"); // Vamos importar Box para usa-la também

// Vamos utilizar uma classe
class FileController {
    async store(req, res) { // Criando um método estilo um middleware utilizando request response
        //  
        const box = await Box.findById(req.params.id); // Params retorna todos os parametros que vem através de rota, .id para pegar o "/.id" da rota
        //console.log(req.file); // Informações no console sobre a requisição
        const file = await File.create({ // Vai criar o arquivo usando os parametros do File
            title: req.file.originalname, // vai pegar o originaName que é o nome que o usuário suiu na app
            path: req.file.key // que foi o caminho gerado no MulterConfig
        });
        box.files.push(file) // Push vai incluir uma nova informação no Array "files" de "Box.js" e coloca o file que foi criado acima

        await box.save(); // Com await na frente pois isso é assincrono

        // Agora precisamos avisar todos o usuário que estão dentro da "box" (const box), que um novo arquivo foi adicionado
        req.io.sockets.in(box._id).emit("file", file); // Utiliza a variável "io" criada em server.js, .sockets pega todos os usuários conectados na app, .in(box._id) pega todos os usuários conectados naquela box com aquele id, .emit('file', file) vai enviar uma informação com os dados do arquivo
        // Então, se um usuário estiver conectado em uma box, e a app estiver conectada na mesma box, e um outro usuário também, então o outro usuário receberá uma notificação que um arquivo foi adicionado nesta box
        
        // Cors é um módulo que determina quem vai poder acessar nossa aplicação, sem ele, o front-end não conseguirá acessar o back-end estando em um domínio diferente
        
        return res.json(file); // Vai retornar o file para o frontend (para o cliente saber que deu certo)
    }
}

module.exports = new FileController();