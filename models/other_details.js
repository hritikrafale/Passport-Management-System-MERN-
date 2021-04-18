const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OtherDetailsSchema = new Schema({
    username : String,
    any_pending_proceeding : String,
    any_pending_warrant_summons : String,
    any_warrant_issued : String,
    prohibiting_departure : String,
    convicted_by_court : String,
    denied_passport : String,
    ever_impounded : String,
    passport_revoked : String,
    citizenship_by_other_country : String,
    any_other_country_passport_anytime : String,
    surrendered_indian_passport : String,
    applied_renunciation_indian_citizenship : String,
    returned_on_EC : String,
    deported_from_any_country : String,
    repatriated_from_any_country : String
});

module.exports = mongoose.model('Other_Details', OtherDetailsSchema);