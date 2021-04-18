const express = require('express');
const router = express.Router();

const User = require('../models/user');
const Passport_Type = require('../models/passport_type');
const Applicant_Details = require('../models/applicant_details');
const Family_Details = require('../models/family_details');
const Residential_Address = require('../models/residential_address');
const Emergency_Contact = require('../models/emergency_contact');
const Identity_Certificate = require('../models/identity_certificates');
const Other_Details = require('../models/other_details');
const Self_Declaration = require('../models/self_declaration');
const Comprehensive_Details = require('../models/comprehensive_details');
const comprehensive_details = require('../models/comprehensive_details');
const emergency_contact = require('../models/emergency_contact');

router.get('/check_status', async (req, res) => {
    const comprehensive_details = await Comprehensive_Details.find({ username: req.session.username });
    const comprehensive_detail = comprehensive_details[0];
    const username = { username: req.session.username };
    res.render('users/check_status', { comprehensive_detail, username });
});

router.get('/', async (req, res) => {
    const comprehensive_detail = await Comprehensive_Details.find({ username: req.session.username });
    const comprehensive_details = comprehensive_detail[0];
    if (comprehensive_detail.length == 0) {
        res.render('users/apply_passport');
    } else {
        const username = { username: req.session.username };
        res.render('users/submitted_application', { comprehensive_details, username });
    }
});

router.get('/passport_type', async (req, res) => {
    if (req.session.username != undefined) {
        const passport_type = await Passport_Type.find({ username: req.session.username });
        const pass = passport_type[0];
        const username = { username: req.session.username };
        res.render('users/passport_type', { pass, username });
    }
});

router.get('/applicant_details', async (req, res) => {
    if (req.session.username != undefined) {
        const applicant_details = await Applicant_Details.find({ username: req.session.username });
        const applicant_detail = applicant_details[0];
        const username = { username: req.session.username };
        res.render('users/applicant_details', { applicant_detail, username });
    }
});

router.get('/family_details', async (req, res) => {
    if (req.session.username != undefined) {
        const family_details = await Family_Details.find({ username: req.session.username });
        const family_detail = family_details[0];
        const username = { username: req.session.username };
        res.render('users/family_details', { family_detail, username });
    }
});

router.get('/residential_address', async (req, res) => {
    if (req.session.username != undefined) {
        const residential_address = await Residential_Address.find({ username: req.session.username });
        const residential_add = residential_address[0];
        const username = { username: req.session.username };
        res.render('users/residential_address', { residential_add, username });
    }
});

router.get('/emergency_contact', async (req, res) => {
    if (req.session.username != undefined) {
        const emergency_contact = await Emergency_Contact.find({ username: req.session.username });
        const emer_contact = emergency_contact[0];
        const username = { username: req.session.username };
        res.render('users/emergency_contact', { emer_contact, username });
    }
});

router.get('/identity_certificate', async (req, res) => {
    if (req.session.username != undefined) {
        const identity_certificate = await Identity_Certificate.find({ username: req.session.username });
        const iden_cert = identity_certificate[0];
        const username = { username: req.session.username };
        res.render('users/identity_certificate', { iden_cert, username });
    }
});

router.get('/other_details', async (req, res) => {
    if (req.session.username != undefined) {
        const other_details = await Other_Details.find({ username: req.session.username });
        const other_detail = other_details[0];
        const username = { username: req.session.username };
        res.render('users/other_details', { other_detail, username });
    }
});

router.get('/passport_details_verification', async (req, res) => {
    const applicant_details = await Applicant_Details.find({ username: req.session.username });
    const applicant_detail = applicant_details[0];
    const family_details = await Family_Details.find({ username: req.session.username });
    const family_detail = family_details[0];
    const residential_address = await Residential_Address.find({ username: req.session.username });
    const residential_add = residential_address[0];
    const username = { username: req.session.username };
    res.render('users/passport_details_verification', { applicant_detail, family_detail, residential_add, username });
});

router.get('/self_declaration', async (req, res) => {
    if (req.session.username != undefined) {
        const self_declaration = await Self_Declaration.find({ username: req.session.username });
        const self_dec = self_declaration[0];
        const username = { username: req.session.username };
        res.render('users/self_declaration', { self_dec, username });
    }
});

router.get('/submitted_application', async (req, res) => {
    const comprehensive_detail = await Comprehensive_Details.find({ username: req.session.username });
    const comprehensive_details = comprehensive_detail[0];
    const username = { username: req.session.username };
    res.render('users/submitted_application', { comprehensive_details, username });
});

router.get('/schedule_appointment', (req, res) => {
    res.render('users/pay_and_schedule_appointment');
});

router.get('/upload_docx', (req, res) => {
    res.render('users/upload_supporting_documents');
});

//following routes are post routes

router.post('/', (req, res) => {
    res.redirect('/passport_seva/apply_passport/passport_type');
});

router.post('/passport_type', async (req, res) => {
    await Passport_Type.deleteOne({ username: req.session.username });
    const passport_type = new Passport_Type({
        username: req.session.username, applying_for: req.body.passport_type,
        type_of_application: req.body.passport_category, type_of_passport_booklet: req.body.passport_booklet
    });
    await passport_type.save();
    res.redirect('/passport_seva/apply_passport/applicant_details');
});

router.post('/applicant_details', async (req, res) => {
    await Applicant_Details.deleteOne({ username: req.session.username });
    const applicant_details = new Applicant_Details({
        username: req.session.username, first_name: req.body.first_name, last_name: req.body.last_name,
        gender: req.body.gender, any_other_name: req.body.any_other_name, changed_name: req.body.changed_name, dob: req.body.dob, place_of_birth_out_of_india: req.body.place_of_birth_out_of_india, place_of_birth: req.body.place_of_birth,
        state: req.body.state, district: req.body.district, martial_status: req.body.martial_status, citizen_of_india_by: req.body.citizen_of_india_by, pan_number: req.body.pan_number, voter_id: req.body.voter_id,
        employment_type: req.body.employment_type, parent_govt_servant: req.body.parent_govt_servant, education_type: req.body.education_type, visible_mark: req.body.visible_mark, aadhaar_number: req.body.aadhaar_number
    });
    await applicant_details.save();
    res.redirect('/passport_seva/apply_passport/family_details');
});

router.post('/family_details', async (req, res) => {
    await Family_Details.deleteOne({ username: req.session.username });
    const family_details = new Family_Details({
        username: req.session.username, father_first_name: req.body.father_first_name,
        father_last_name: req.body.father_last_name, mother_first_name: req.body.mother_first_name,
        mother_last_name: req.body.mother_last_name, guardian_first_name: req.body.guardian_first_name,
        guardian_last_name: req.body.guardian_last_name
    });
    await family_details.save();
    res.redirect('/passport_seva/apply_passport/residential_address');
});

router.post('/residential_address', async (req, res) => {
    await Residential_Address.deleteOne({ username: req.session.username });
    const residential_address = new Residential_Address({
        username: req.session.username,
        present_address_out_of_india: req.body.present_address_out_of_india,
        house_street: req.body.house_street, village_town_city: req.body.village_town_city,
        state_ut: req.body.state_ut, district: req.body.district, police_station: req.body.police_station,
        pincode: req.body.pincode, moblie_number: req.body.moblie_number, telephone_number: req.body.telephone_number,
        email_id: req.body.email_id, is_permanent_address_available: req.body.is_permanent_address_available
    });
    await residential_address.save();
    res.redirect('/passport_seva/apply_passport/emergency_contact');
});

router.post('/emergency_contact', async (req, res) => {
    await Emergency_Contact.deleteOne({ username: req.session.username });
    const emergency_contact = new Emergency_Contact({
        username: req.session.username, name_and_address: req.body.name_and_address,
        mobile_number: req.body.mobile_number, telephone_number: req.body.telephone_number, email_id: req.body.email_id
    });
    await emergency_contact.save();
    res.redirect('/passport_seva/apply_passport/identity_certificate');
});

router.post('/identity_certificate', async (req, res) => {
    await Identity_Certificate.deleteOne({ username: req.session.username });
    const identity_certificate = new Identity_Certificate({
        username: req.session.username, any_identity_certificate: req.body.any_identity_certificate,
        details_of_previous_passport: req.body.details_of_previous_passport, applied_but_not_issued: req.body.applied_but_not_issued
    });
    await identity_certificate.save();
    res.redirect('/passport_seva/apply_passport/other_details');
});

router.post('/other_details', async (req, res) => {
    await Other_Details.deleteOne({ username: req.session.username });
    const other_details = new Other_Details({
        username: req.session.username, any_pending_proceeding: req.body.any_pending_proceeding,
        any_pending_warrant_summons: req.body.any_pending_warrant_summons, any_warrant_issued: req.body.any_warrant_issued,
        prohibiting_departure: req.body.prohibiting_departure, convicted_by_court: req.body.convicted_by_court,
        denied_passport: req.body.denied_passport, ever_impounded: req.body.ever_impounded, passport_revoked: req.body.passport_revoked,
        citizenship_by_other_country: req.body.citizenship_by_other_country, any_other_country_passport_anytime: req.body.any_other_country_passport_anytime,
        surrendered_indian_passport: req.body.surrendered_indian_passport, applied_renunciation_indian_citizenship: req.body.applied_renunciation_indian_citizenship,
        returned_on_EC: req.body.returned_on_EC, deported_from_any_country: req.body.deported_from_any_country, repatriated_from_any_country: req.body.repatriated_from_any_country
    });
    await other_details.save();
    res.redirect('/passport_seva/apply_passport/passport_details_verification');
});

router.post('/self_declaration', async (req, res) => {
    console.log(req.session.username);
    await Self_Declaration.deleteOne({ username: req.session.username });
    const self_declaration = new Self_Declaration({ username: req.session.username, place: req.body.place, date: req.body.date });
    await self_declaration.save();
    const passport_type = await Passport_Type.find({ username: req.session.username });
    const passport_type_id = passport_type[0].id;
    console.log("Passport type id : ", passport_type_id);
    const applicant_detail = await Applicant_Details.find({ username: req.session.username });
    const applicant_detail_id = applicant_detail[0].id;
    const family_detail = await Family_Details.find({ username: req.session.username });
    const family_detail_id = family_detail[0].id;
    const residential_address = await Residential_Address.find({ username: req.session.username });
    const residential_address_id = residential_address[0].id;
    const emergency_contact = await Emergency_Contact.find({ username: req.session.username });
    const emergency_contact_id = emergency_contact[0].id;
    const identity_certificate = await Identity_Certificate.find({ username: req.session.username });
    const identity_certificate_id = identity_certificate[0].id;
    const other_detail = await Other_Details.find({ username: req.session.username });
    const other_detail_id = other_detail[0].id;
    const self_declaration_id = self_declaration.id;
    const comprehensive_detail = new Comprehensive_Details({
        username: req.session.username, passport_type: passport_type_id,
        applicant_detail: applicant_detail_id, family_detail: family_detail_id, residential_address: residential_address_id,
        emergency_contact: emergency_contact_id, identity_certificate: identity_certificate_id, others_details: other_detail_id,
        self_declaration: self_declaration_id, application_status: "Submitted", application_approved_status: "N/A", police_approved_status: "N/A"
    });
    await comprehensive_detail.save();
    const comprehensive_detai = await Comprehensive_Details.find({ username: req.session.username });
    const comprehensive_details = comprehensive_detai[0];
    res.redirect('/passport_seva/apply_passport/submitted_application', { comprehensive_details });
});

module.exports = router;