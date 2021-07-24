const addContact = require('./addContact')
const getContactById = require('./getContactById')
const updateContact = require('./updateContact')
const getAllContacts = require('./getAllContacts')
const deleteContact = require('./deleteContact')
const updateContactStatus = require('./updateContactStatus')

module.exports = {
  addContact,
  getContactById,
  updateContact,
  getAllContacts,
  deleteContact,
  updateContactStatus
}
