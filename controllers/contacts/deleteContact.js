const { contact: service } = require('../../servises')

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params

  try {
    const result = await service.deleteContact(contactId)
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    })
  } catch (error) {
    next(error)
  }
}

module.exports = deleteContact
