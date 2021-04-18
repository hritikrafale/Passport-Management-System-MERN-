const express = require('express');
const router = express.Router();

const Passport_Type = require('../models/passport_type');
const Applicant_Details = require('../models/applicant_details');
const Family_Details = require('../models/family_details');
const Residential_Address = require('../models/residential_address');
const Emergency_Contact = require('../models/emergency_contact');
const Identity_Certificate = require('../models/identity_certificates');
const Other_Details = require('../models/other_details');
const Self_Declaration = require('../models/self_declaration');
const Comprehensive_Details = require('../models/comprehensive_details');

router.get('/home' , (req,res) => {
    res.render('admin/admin_home');
});

router.get('/applicant_detail/:applicant_id' ,async (req,res) => {
    const comprehensive_details = await Comprehensive_Details.find({_id : req.params.applicant_id});
    const comprehensive_detail = comprehensive_details[0];
    const passport_type_details = await Passport_Type.find({_id : comprehensive_detail.passport_type});
    const passport_type_detail = passport_type_details[0];
    const applicant_details = await Applicant_Details.find({_id : comprehensive_detail.applicant_detail});
    const applicant_detail = applicant_details[0];
    const family_details = await Family_Details.find({_id : comprehensive_detail.family_detail}); 
    const family_detail = family_details[0];
    const residential_address_details = await Residential_Address.find({_id : comprehensive_detail.residential_address});
    const residential_address_detail = residential_address_details[0];
    const emergency_contact_details = await Emergency_Contact.find({_id : comprehensive_detail.emergency_contact});
    const emergency_contact_detail = emergency_contact_details[0];
    const identity_certificate_details = await Identity_Certificate.find({_id : comprehensive_detail.identity_certificate});
    const identity_certificate_detail = identity_certificate_details[0];
    const other_details = await Other_Details.find({_id : comprehensive_detail.others_details});
    const other_detail = other_details[0];
    console.log(other_detail);
    const self_declaration_details = await Self_Declaration.find({_id : comprehensive_detail.self_declaration});
    const self_declaration_detail = self_declaration_details[0];
    res.render('admin/admin_applicant_detail',{comprehensive_detail,passport_type_detail,applicant_detail,family_detail,residential_address_detail,emergency_contact_detail,
        identity_certificate_detail,other_detail,self_declaration_detail});
});

router.post('/applicant_detail',(req,res) => {
    res.redirect(`/passport_seva/admin/applicant_detail/${req.body.applicant_id}`);
});

router.post('/applicant_detail/:id' , async (req,res) => {
    const {id} = req.params;
    const comprehensive_details = await Comprehensive_Details.find({_id : id});
    const comprehensive_detail = comprehensive_details[0];
    comprehensive_detail.application_approved_status = "Approved";
    console.log(comprehensive_detail);
    await Comprehensive_Details.deleteOne({_id : id}); 
    const comprehensive = new Comprehensive_Details({_id : comprehensive_detail._id, username : comprehensive_detail.username , passport_type : comprehensive_detail.passport_type,
        applicant_detail : comprehensive_detail.applicant_detail,family_detail : comprehensive_detail.family_detail,
        residential_address : comprehensive_detail.residential_address,
        emergency_contact : comprehensive_detail.emergency_contact, identity_certificate :comprehensive_detail.identity_certificate ,
        others_details : comprehensive_detail.other_details,self_declaration : comprehensive_detail.self_declaration,
        application_status : comprehensive_detail.application_status,application_approved_status : comprehensive_detail.application_approved_status,
        police_approved_status : comprehensive_detail.police_approved_status});
    await comprehensive.save();
    res.send(comprehensive);
});

module.exports = router;