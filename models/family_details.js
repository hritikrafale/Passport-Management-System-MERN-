const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamilyDetailsSchema = new Schema({
    username : String,
    father_first_name : String,
    father_last_name : String,
    mother_first_name : String,
    mother_last_name : String,
    guardian_first_name : String,
    guardian_last_name : String
});

module.exports = mongoose.model('Family_Details', FamilyDetailsSchema);