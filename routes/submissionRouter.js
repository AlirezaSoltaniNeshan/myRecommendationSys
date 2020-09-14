const express = require('express')
const router = express.Router()
const controller = require('../controller/loginController')

router.get('/submitUserData', controller.gitAccountSubmission)
// When users can go to their Google accounts:
router.get('/submitGoogleUserData', controller.googleAccountSubmission)

module.exports = router