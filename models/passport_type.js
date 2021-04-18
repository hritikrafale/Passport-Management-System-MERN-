const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PassportTypeSchema = new Schema({
    username : String,
    applying_for : String,
    type_of_application : String,
    type_of_passport_booklet : String
});

module.exports = mongoose.model('Passport_Type', PassportTypeSchema);