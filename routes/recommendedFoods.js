const express = require('express')
const router = express.Router()

const recommededFoodsController = require('../controller/recommededFoods') 
router.get('/recommededFoods', recommededFoodsController.getRecommendationTitle)

module.exports = router