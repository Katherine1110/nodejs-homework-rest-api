const { contact } = require('../model/schema')

const contactValidateMiddleware = (res, req, next) => {
  const error = contact.validateContact(req.body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
  }
  next()
}

module.exports = contactValidateMiddleware
