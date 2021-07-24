const { Contact } = require('../model')

const addContact = (newContact) => {
  return Contact.create(newContact)
}

const updateContact = async (contactId, updateContact) => {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, updateContact, { new: true })
    return result
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      return null
    }
    throw error
  }
}

const updateContactStatus = async (contactId, updateContact) => {
  try {
    const result = await Contact.findByIdAndUpdate(contactId, updateContact, { new: true })
    return result
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      return null
    }
    throw error
  }
}

const getAllContacts = () => {
  return Contact.find({})
}

const getContactById = async (contactId) => {
  try {
    const result = await Contact.findById(contactId)
    return result
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

const deleteContact = async (contactId) => {
  try {
    const result = await Contact.findByIdAndDelete(contactId)
    return result
  } catch (error) {
    if (error.message.includes('Cast to Object failed')) {
      return null
    }
    throw error
  }
}

module.exports = {
  addContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  updateContactStatus
}
