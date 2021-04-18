const express = require('express');
const { Passport } = require('passport');
const passport = require('passport');
const router = express.Router();
const LocalStrategy = require('passport-local');

const User = require('../models/user');

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/home', (req, res) => {
    console.log(req.session.username);
    const username = { username: req.session.username };
    res.render('home', { username });
});

router.get('/register', (req, res) => {
    res.render('authentication/new_registration');
});

router.post('/register', async (req, res) => {
    try {
        const { register_to_apply_at, passport_office, first_name, last_name, date_of_birth, email_id, username, password, hint_question, hint_answer } = req.body;
        const user = new User({ register_to_apply_at, passport_office, first_name, last_name, date_of_birth, email_id, hint_question, hint_answer, username });
        console.log(user);
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return err;
            res.redirect('/passport_seva/home');
        })
    } catch (e) {
        console.log(e);
        res.redirect('/passport_seva/register');
    }
});

router.get('/admin_login', (req, res) => {
    const username = { username: req.session.username };
    res.render('authentication/admin_login', { username });
});

router.post('/admin_login', (req, res) => {
    if (req.body.username == "admin" && req.body.password == "admin") {
        res.redirect('/passport_seva/admin/home');
    }
});

router.get('/police_login', (req, res) => {
    const username = { username: req.session.username };
    res.render('authentication/police_login', { username });
});

router.post('/police_login', (req, res) => {
    if (req.body.username == "police" && req.body.password == "police") {
        res.redirect('/passport_seva/police/home');
    }
});

router.get('/login', (req, res) => {
    const username = { username: req.session.username };
    res.render('authentication/login', { username });
});

router.post('/login', passport.authenticate('local', { failureFlash: false, failureRedirect: '/passport_seva/login' }), async (req, res) => {
    req.session.username = req.body.username;
    if (req.session.username === "admin") {
        res.redirect('/passport_seva/admin_home');
    } else {
        res.redirect('/passport_seva/home');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    req.logout();
    res.redirect('/passport_seva/home');
});

module.exports = router;