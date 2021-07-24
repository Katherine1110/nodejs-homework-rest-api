const { contact: service } = require('../../servises')

const getContactById = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const result = await service.getContactById(contactId)
    if (!result) {
      res.status(404).json({
        ststus: 'error',
        code: 404,
        message: 'Not found'
      })
    }
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

module.exports = getContactById
