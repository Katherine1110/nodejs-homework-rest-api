const express = require('express')
const { auth: ctrl } = require('../controllers')

const router = express.Router()

router.post('/signup', ctrl.signup)

router.post('/login', ctrl.login)

router.post('/logout', ctrl.logout)

module.exports = router
