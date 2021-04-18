const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const { Passport } = require('passport');
const passport = require('passport');

const User = require('./models/user');

const passportSevaRoutes = require('./routes/passport_seva');
const adminRoutes = require('./routes/admin');
const policeRoutes = require('./routes/police');
const applyPassportRoutes = require('./routes/apply_passport');

mongoose.connect('mongodb://localhost:27017/PassportManagementSystem', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const sessionOptions = { secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false }
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/passport_seva', passportSevaRoutes);
app.use('/passport_seva/admin', adminRoutes);
app.use('/passport_seva/police', policeRoutes);
app.use('/passport_seva/apply_passport', applyPassportRoutes);

app.listen(3000, () => {
    console.log('Serving at port 3000');
});