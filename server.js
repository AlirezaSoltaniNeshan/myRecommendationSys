const env = require('./config/env'),
    path = require('path'),
    express = require('express'),
    session = require('express-session'),
    mySql = require('mysql'),
    app = express(),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    passport = require('passport')

// =========================== PASSPORT STRATEGY ===========================
// Github strategy 
const GitHubStrategy = require('passport-github').Strategy;
// Github Config
const gitConf = require('./config/gitConf');
// Google strategy 
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Google config
const googleConf = require('./config/googleConfig');

//=========================== Database ===========================
const config = require('./config/db')
// Create connection to db MySQL 
const conn = mySql.createConnection(config);
// Check out connection is true or false
conn.connect((err) => {
    if (err) console.log('Connection failed');
    else console.log('Connected');
})

// Backbone Creation
app.use(helmet());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static('public'))

// Use JSON and Encoded that in any requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// This section must be first!
app.use(session({
    secret: 'I love Express!',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
// Setting passport with Github strategy
passport.use(new GitHubStrategy(gitConf,
    function (accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));
// Setting passport with Google strategy
passport.use(new GoogleStrategy(googleConf,
    function (token, tokenSecret, profile, cb) {
        return cb(null, profile);
    }
));
// SerializeUser
passport.serializeUser((user, cb) => {
    cb(null, user)
});
// DeserializeUsers
passport.deserializeUser((user, cb) => {
    cb(null, user)
});


// The Routes 
const login = require('./routes/login');
const userSubmission = require('./routes/submissionRouter')
const index = require('./routes/index')
const businessesSearch = require('./routes/businessesSearchId');
const recommendedFoods = require('./routes/recommendedFoods')
// When users can go to their Github accounts:
app.use(userSubmission)
// Login Page Render
app.use(login)

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

// Root endpoint:
app.use('/', index)

// Businesses search view
app.use(businessesSearch)

// To recommend foods to any users
app.use(recommendedFoods)



app.listen(env.PORT, () => {
    console.log(`your server port is ${env.PORT}`);
});
