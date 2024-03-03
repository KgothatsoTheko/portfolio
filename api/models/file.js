const mongoose = require('mongoose')

const file = new mongoose.Schema({
    filename: {type: String},
    contentType: {type: String},
    length: {type: Number},
    id: { type: mongoose.Schema.Types.ObjectId, unique: true },
})

module.exports = mongoose.model('file', file);