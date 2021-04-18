const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ApplicantDetailsSchema = new Schema({
    username : String,
    first_name : String, 
    last_name : String,
    gender : String,
    any_other_name : String,
    changed_name : String,
    dob : Date,
    place_of_birth_out_of_india : String,
    place_of_birth : String,
    state : String,
    district : String,
    martial_status : String,
    citizen_of_india_by : String,
    pan_number : String,
    voter_id : String,
    employment_type : String,
    parent_govt_servant : String,
    education_type : String,
    visible_mark : String,
    aadhaar_number : Number
});

module.exports = mongoose.model('Applicant_Details', ApplicantDetailsSchema);