const Box = require("../models/Box"); // Importando os models de Box

// Vamos utilizar uma classe
class BoxController {
    async store(req, res) { // Criando um método estilo um middleware utilizando request response
        const box = await Box.create({ title: req.body.title}); // No req (request) vai buscar o atributo 'title' do 'body'
        // A linha acima também funcionaria assim: const box = await Box.create({ title: req.body.title});
        return res.json(box);
    }

    async show(req, res) { // Metodo para retornar o que esta na box segundo id
       // const box = await Box.findById(req.params.id).populate("files"); // busca o arquivo com o tal id, populate (mongoose) vai popular um relacionamento (DB) 'files'
       const box = await Box.findById(req.params.id).populate({
           path: 'files', // O files da linha comentada acima vem como um dos parametos (path)
           // Para que além disso...
           options: { sort: { createdAt: -1 } } // Vai ordenar os arquivos de forma decrescente, se for 1 ordena de forma crescente

       });
        return res.json(box);
    }
}

module.exports = new BoxController();