const { contact: service } = require('../../servises')

const getAllContacts = async (req, res, next) => {
  try {
    const result = await service.getAllContacts()
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = getAllContacts
