const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SelfDeclarationSchema = new Schema({
    username : String,
    place : String,
    date : String
});

module.exports = mongoose.model('Self_Declaration', SelfDeclarationSchema);