const express = require('express')
const router = express.Router()
const businessesController = require('../controller/businessesSearchId')

router.get('/yelp/:yelpId', businessesController.getYelpBusinessesSearch)


module.exports = router