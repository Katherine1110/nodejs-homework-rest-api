const { user: service } = require('../../servises')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await service.getOne({ email })
    console.log(user)
    if (!user || !user.comparePassword(password)) {
      res.status(400).json({
        status: 'error',
        code: 400,
        message: 'bad request'
      })
    }
    const { SECRET_KEY } = process.env
    const payload = {
      id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY)

    res.json({
      status: 'success',
      code: 200,
      data: {
        result: token
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = login
