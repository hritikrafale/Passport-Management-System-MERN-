const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IdentityCertificateSchema = new Schema({
    username : String,
    any_identity_certificate : String,
    details_of_previous_passport : String,
    applied_but_not_issued : String
});

module.exports = mongoose.model('Identity_Certificates', IdentityCertificateSchema);