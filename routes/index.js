const express = require('express')
const router = express.Router()
// Root endpoint middleware controller 
const rootEndpoint = require('../controller/rootEndpoint')

router.get('/', rootEndpoint.rootEndpoint)

module.exports = router