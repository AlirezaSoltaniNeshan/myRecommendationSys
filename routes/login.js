const express = require('express')
const router = express.Router()
// Main Controller is added
const controller = require('../controller/loginController')

router.use((req, res, next) => {
    switch (req.query.msg) {
        case 'dbErr':
            res.locals.msg = `<script>alert('Database error');</script>`;
            break;
            case 'accessDenied':
                res.locals.msg = `<script>alert('Your are not in Best Reads site!!');</script>`;
                break;
        default:
            res.locals.msg = ``;
    }
    next();
});


// Main Login screen 
router.get('/login', controller.loginScreen)
// GitHub Login Screen 
router.get('/Gitlogin', controller.gitLogin)
router.get('/auth', controller.gitAuth)
// Google Login Screen 
router.get('/Glogin', controller.gLogin)
router.get('/gAuth', controller.googleAuth)



module.exports = router