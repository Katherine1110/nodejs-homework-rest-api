const { user: service } = require('../../servises')

const signup = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const result = await service.getOne({ email })
    if (result) {
      res.status(409).json({
        status: 'error',
        code: 409,
        message: 'Already signup'
      })
      return
    }
    await service.add({ email, password })
    res.status(201).json({
      status: 'succsess',
      code: 201,
      message: 'success'
    })
  } catch (error) {
    next(error)
  }
}

module.exports = signup
