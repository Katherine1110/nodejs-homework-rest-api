const express = require('express')
const router = express.Router()
const fns = require('../../model/index')
const { uuid } = require('uuidv4')
const Joi = require('joi')

const contactSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] }
    })
    .required(),
  phone: Joi.string()
    .min(7)
    .required(),
})

router.get('/', async (req, res, next) => {
  fns.listContacts().then(contacts => {
    res.json({
      message: 'template message',
      status: 'success',
      code: 200,
      data: { result: contacts }
    })

    next()
  })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  fns.getContactById(contactId).then((contacts) => {
    if (contacts) {
      res.json({
        message: 'template message',
        status: 'success',
        code: 200,
        data: {
          result: contacts
        }
      })
    } else {
      res.json({
        message: 'Not found',
        status: 'error',
        code: 404,
      })
    }

    next()
  })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  const newContact = { ...req.body, id: uuid() }
  const { error } = contactSchema.validate({ name, email, phone })
  console.log(error + ' error')
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return
  }

  if (!name || !email || !phone) {
    res.status(400).json(
      {
        code: 400,
        status: 'bed request',
        message: 'missing required name field'
      }
    )

    next()
  } else {
    fns.addContact(newContact).then(contact => {
      res.status(201).json({
        status: 'success',
        code: 201,
        data: contact
      })

      next()
    })
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  if (!contactId) {
    res.status(404).json({
      code: 404,
      status: 'bed request',
      message: 'missing required name field'
    })

    next()
  } else {
    fns.removeContact(contactId).then(contacts => {
      if (contacts.length === 0) {
        res.status(404).json({
          code: 404,
          message: 'Not Found',
          status: 'bed request'
        })
      }
      res.status(200).json({
        message: 'contact deleted',
        status: 'success',
        code: 200,
        data: contacts
      })
      next()
    })
  }
})

router.patch('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body
  const { contactId } = req.params
  console.log('Id ' + contactId)
  const { error } = contactSchema.validate({ name, email, phone })
  console.log(error + ' error')
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return
  }
  if (!name || !email || !phone) {
    res.status(400).json({
      code: 400,
      status: 'bed request',
      message: 'missing fields'
    })
    next()
  } else {
    fns.updateContact(contactId, name, email, phone).then(contact => {
      if (!contact) {
        res.status(404).json({
          code: 404,
          message: 'Not Found',
          status: 'bad request'
        })
      } else {
        res.status(200).json({
          message: 'contact updated',
          status: 'success',
          code: 200,
          data: contact
        })
      }

      next()
    })
  }
})

module.exports = router
