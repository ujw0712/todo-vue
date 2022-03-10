const express = require('express')
const controller = require('../controllers/colorController')
const router = express.Router()

router.get('/list', controller.getColorList)

module.exports = router