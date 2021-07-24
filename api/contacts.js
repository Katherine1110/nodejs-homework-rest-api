const express = require('express')
const router = express.Router()
const { validateMiddleware } = require('../middleware')
const { validateContact } = require('../model/schema')

const { contacts: ctrl } = require('../controllers')

router.get('/', ctrl.getAllContacts)

router.post('/', validateMiddleware(validateContact), ctrl.addContact)

router.get('/:contactId', ctrl.getContactById)

router.delete('/:contactId', ctrl.deleteContact)

router.put('/:contactId', ctrl.updateContact)

router.patch('/:contactId/favorite', validateMiddleware(validateContact), ctrl.updateContactStatus)

module.exports = router
