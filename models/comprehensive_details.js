const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Passport_Type = require('./passport_type');
const Applicant_Details = require('./applicant_details');
const Family_Details = require('./family_details');
const Residential_Address = require('./residential_address');
const Emergency_Contact = require('./emergency_contact');
const Identity_Certificates = require('./identity_certificates');
const Other_Details = require('./other_details');
const Self_Declaration = require('./self_declaration');

const ApplicantDetailsSchema = new Schema({
    username : String,
    passport_type : {
        type : Schema.Types.ObjectId,
        ref : 'Passport_Type'
    },
    applicant_detail : {
        type : Schema.Types.ObjectId,
        ref : 'Applicant_Details'
    },
    family_detail : {
        type : Schema.Types.ObjectId,
        ref : 'Family_Details'
    },
    residential_address : {
        type : Schema.Types.ObjectId,
        ref : 'Residential_Address'
    },
    emergency_contact : {
        type : Schema.Types.ObjectId,
        ref : 'Emergency_Contact'
    },
    identity_certificate : {
        type : Schema.Types.ObjectId,
        ref : 'Identity_Certificates'
    },
    others_details : {
        type : Schema.Types.ObjectId,
        ref : 'Others_Details'
    },
    self_declaration : {
        type : Schema.Types.ObjectId,
        ref : 'Self_Declaration'
    },
    application_status : String,
    application_approved_status : String,
    police_approved_status : String
});

module.exports = mongoose.model('Comprehensive_Details',ApplicantDetailsSchema);