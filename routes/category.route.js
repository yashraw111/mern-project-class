const router = require('express').Router()

const catController = require('../controller/category.controller')
const { verifyToken } = require('../middleware/auth')

router.route('/')
.post(verifyToken,catController.store)

module.exports = router