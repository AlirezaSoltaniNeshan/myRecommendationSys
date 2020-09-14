const model = require('../model/dbModel')
const passport = require('passport')

// Main Login screen is here!!
const loginScreen = (req, res) => {
    res.render('login')
}
// Github Login section:
const gitLogin = passport.authenticate('github')

const gitAuth = passport.authenticate('github', {
    successRedirect: '/submitUserData', // Will be change
    failureRedirect: '/login'
})
// Google Login section:
const gLogin = passport.authenticate('google', { scope: ['profile'] })

const googleAuth = ('/gAuth', passport.authenticate('google', {
    successRedirect: '/submitGoogleUserData',
    failureRedirect: '/login'
}))
// Submit users with github accounts 
const gitAccountSubmission = (req, res, next) => {
    // Create user details objection 
    const users = {
        uid: req.user.id,
        username: req.user.username,
        name: req.user.displayName,
        avatar: req.user.photos[0].value,
        s_provider: 'Github'
    }
    // To check if our user has not any account in our db
    const checkQuery = `SELECT uid FROM users where uid=${users.uid}`
    model.conn.query(checkQuery, (err, results) => {
        if (err) res.redirect('/login?msg=dbErr') //console.log(err) 

        if (results == "") {
            const cmd = 'INSERT INTO users SET?'
            model.conn.query(cmd, users, (err, results) => {
                if (err) res.redirect('/login?msg=dbErr') //console.log(err) 
                else {
                    // res.cookie("U_id", users.uid)
                    req.session.u_id = users.uid
                    res.redirect('/')
                }
            })
        }
        else {
            // res.cookie("U_id", users.uid)
            req.session.u_id = users.uid
            res.redirect('/')
        }
    })
}

const googleAccountSubmission = (req, res, next) => {
    // // Create user details objection 
    const users = {
        uid: req.user.id,
        username: req.user.displayName,
        name: req.user.displayName,
        avatar: req.user.photos[0].value,
        s_provider: req.user.provider
    }
    // To check if our user has not any account in our db
    const checkQuery = `SELECT uid FROM users where uid=${users.uid}`
    model.conn.query(checkQuery, (err, results) => {
        if (err) res.redirect('/login?msg=dbErr') //console.log(err) 

        if (results == "") {
            const cmd = 'INSERT INTO users SET?'
            model.conn.query(cmd, users, (err, results) => {
                if (err) res.redirect('/login?msg=dbErr') //console.log(err) 
                else {
                    // res.cookie("U_id", users.uid)
                    req.session.u_id = users.uid
                    res.redirect('/')
                }
            })
        }
        else {
            // res.cookie("U_id", users.uid)
            req.session.u_id = users.uid
            res.redirect('/')
        }
    })
}

module.exports = {
    loginScreen,
    gitLogin,
    gitAuth,
    gLogin,
    googleAuth,
    gitAccountSubmission,
    googleAccountSubmission
} 