const multer = require("multer"); // Lib que manipula arquivos
const path = require("path"); // Lib que já vem com o node, serve para manipular caminhos de pastas
const crypto = require("crypto"); // Lib que já vem no node, gera hashs e conjunto de caracteres únicos

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'), // Resolve da lib path, serve para padronizar tipos de caminhos, para evitar problemas de não encontrar a pasta em sistemas operacionais diferentes ou arquivo movido, etc...
                                                     // "__dirname" é p nome do diretório, '..' volta uma pasta (estamos em config)
    storage: multer.diskStorage({
        destination: (req, file, cb) => { // atributo que define o destino (onde o arquivo sera guardado)
            cb(null, path.resolve(__dirname, '..', '..', 'tmp')); // cb ou Callback é chamado no final da instrução
        },
        filename: (req, file, cb) => { // atributo que define o nome do arquivo (será usado o crypto para evitar nomes duplicados, o que implica em sobrescrita do arquivo)
            crypto.randomBytes(16, (err, hash) => { // Irá gerar 16 bytes de caracteres randomicos entre num letras e hexadecimais
                if (err) cb (err); // Se der algum erro, a função "callback" (cb) irá retornar o erro, (Metodo antigo de fazer isso, o mais atual é promisses (async await))
                // Se não deu erro...
                file.key = `${hash.toString('hex')}-${file.originalname}`; // vai usar a propriedade 'key' do 'file' para pegar o hash do crypto mais o "-" e o nome do arquivo
                cb(null, file.key); // Vai setar o nome gerado na linha acima para o atributo filename.
            })
        }
    })
}                           