const express = require('express');
const router = express.Router();

const Comprehensive_Details = require('../models/comprehensive_details');
const Applicant_Details = require('../models/applicant_details');
const Residential_Address = require('../models/residential_address');

router.get('/home', (req, res) => {
    res.render('police/police_home');
});

router.get('/applicant_detail/:applicant_id', async (req, res) => {
    const comprehensive_details = await Comprehensive_Details.find({ _id: req.params.applicant_id });
    const comprehensive_detail = comprehensive_details[0];
    const applicant_details = await Applicant_Details.find({ _id: comprehensive_detail.applicant_detail });
    const applicant_detail = applicant_details[0];
    const residential_address_details = await Residential_Address.find({ _id: comprehensive_detail.residential_address });
    const residential_address_detail = residential_address_details[0];
    const username = { username: req.session.username };
    res.render('police/police_applicant_detail', { comprehensive_detail, applicant_detail, residential_address_detail, username });
});

router.post('/applicant_detail/:id', async (req, res) => {
    const { id } = req.params;
    const comprehensive_details = await Comprehensive_Details.find({ _id: id });
    const comprehensive_detail = comprehensive_details[0];
    comprehensive_detail.police_approved_status = "Approved";
    console.log(comprehensive_detail);
    await Comprehensive_Details.deleteOne({ _id: id });
    const comprehensive = new Comprehensive_Details({
        _id: comprehensive_detail._id, username: comprehensive_detail.username, passport_type: comprehensive_detail.passport_type,
        applicant_detail: comprehensive_detail.applicant_detail, family_detail: comprehensive_detail.family_detail,
        residential_address: comprehensive_detail.residential_address,
        emergency_contact: comprehensive_detail.emergency_contact, identity_certificate: comprehensive_detail.identity_certificate,
        others_details: comprehensive_detail.others_details, self_declaration: comprehensive_detail.self_declaration,
        application_status: comprehensive_detail.application_status, application_approved_status: comprehensive_detail.application_approved_status,
        police_approved_status: comprehensive_detail.police_approved_status
    });
    await comprehensive.save();
    res.send(comprehensive);
});

router.post('/applicant_detail', (req, res) => {
    res.redirect(`/passport_seva/police/applicant_detail/${req.body.applicant_id}`);
});

module.exports = router;