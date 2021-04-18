const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmergencyContactSchema = new Schema({
    username : String,
    name_and_address : String,
    mobile_number : Number,
    telephone_number : Number,
    email_id : String
});

module.exports = mongoose.model('Emergency_Contact', EmergencyContactSchema);