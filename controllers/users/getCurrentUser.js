jwt = require('jsonwebtoken')
require('dotenv').config()
const { user: service } = require('../../servises')

const getCurrentUser = async(req, res, next) => {
  const currentUser = {
    email: req.user.email,
    _id: req.user._id
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: currentUser
    }
  })
}

module.exports = getCurrentUser
