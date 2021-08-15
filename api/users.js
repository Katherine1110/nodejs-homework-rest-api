const express = require('express')
const { users: ctrl } = require('../controllers')
const { useAuth } = require('../middleware')

const router = express.Router()

router.post('/current', useAuth, ctrl.getCurrentUser)

module.exports = router
