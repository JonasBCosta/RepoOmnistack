const mongoose = require("mongoose");

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    path: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    toObject: {virtuals: true}, // Arquivos do tipo Object ou JSon fará o carregamento do tipo virtual automaticamente
    toJSON: {virtuals: true} // No res.Json transforma em Json por exemplo, e com esta linha vira a 'url' para o metodo abaixo

});

File.virtual('url').get(function(){ // Vai criar um caminho virtual para o arquivo, porque somente com o id e o nome do arquivo não é possível acessá-lo diretamente. O caminho virtual não existirá no banco de dados, somente no back-end da aplicação
//Deve ser acessado neste formato de função pois com arrow functions não é possível acessar o "this" para acessar a instancia desta classe
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`; // Com apostrophe é possível acessar variáveis, diferentemente com aspas. encodedURIComponent vai acessar o dado em formato de URL. E acessa a variável de path da própria instancia

});

module.exports = mongoose.model("File", File);