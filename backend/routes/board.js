const express = require('express')
const controller = require('../controllers/boardController')
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/list', controller.getList)
router.post('/', auth, controller.create)
router.put('/:id', controller.update)
router.delete('/:id', controller.remove)

module.exports = router