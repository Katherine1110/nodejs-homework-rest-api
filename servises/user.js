// const bcrypt = require('bcryptjs')

const { User } = require('../model')

const getOne = (filter) => {
  return User.findOne(filter)
}

const add = ({ email, password }) => {
  const newUser = new User({ email })
  newUser.setPassword(password)
  return newUser.save()
//   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//   return User.create({ email, password: hashPassword })
}

module.exports = {
  getOne,
  add
}
