const mongoose = require("mongoose");

const Box = new mongoose.Schema({ // Vai utilizar um Schema porque não é relacional, ou seja, não serão tabelas
    title: {
        type: String,
        required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File"}] // Serão vários id's de Files dentro de um Box, por isso o array "Files"
}, {
    timestamps: true
});

module.exports = mongoose.model("Box", Box);