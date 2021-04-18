const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    register_to_apply_at : String,
    passport_office : String,
    first_name : String,
    last_name : String,
    date_of_birth : Date,
    email_id : String,
    hint_question : String,
    hint_answer : String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', UserSchema);