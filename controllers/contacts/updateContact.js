const { contact: service } = require('../../servises')

const updateContact = async (req, res, next) => {
  const { body } = req
  const { contactId } = req.params
  try {
    const result = await service.updateContact(contactId, body)
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

module.exports = updateContact
