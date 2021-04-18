const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResidentialAddressSchema = new Schema({
    username : String,
    present_address_out_of_india : String,
    house_street : String,
    village_town_city : String,
    state_ut : String,
    district : String,
    police_station : String, 
    pincode : Number,
    moblie_number : Number,
    telephone_number : Number,
    email_id : String,
    is_permanent_address_available : String
});

module.exports = mongoose.model('Residential_Address', ResidentialAddressSchema);