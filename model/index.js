const fs = require('fs/promises')
const contacts = require('./contacts.json')
const path = require('path')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const allContacts = JSON.parse(data)
    return allContacts
  } catch (error) {
    console.log('error :', error)
  }
}

const getContactById = async (contactId) => {
  try {
    // console.log(`Looking for id ${contactId}`)
    const data = await fs.readFile(contactsPath, 'utf-8')
    const allContacts = JSON.parse(data)
    const findContact = allContacts.find((contact) => contact.id.toString() === contactId)
    if (!findContact) {
      console.log('something went wrong')
    }
    return findContact
  } catch (error) {
    console.log('error :', error)
  }
}

const removeContact = async (contactId) => {
  const deleteContactById = contacts.filter(contact => contact.id.toString() !== contactId)
  if (deleteContactById.length === contacts.length) {
    return []
  } else {
    await fs.writeFile(contactsPath, JSON.stringify(deleteContactById), error => {
      if (error) {
        return console.log('error :', error)
      }
    })
    return deleteContactById
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8')
    const allContacts = JSON.parse(data)

    allContacts.push(body)
    console.log('Writing new contacts:' + allContacts)

    await fs.writeFile(contactsPath, JSON.stringify(allContacts))
    return body
  } catch (error) {
    console.log(error)
  }
}

const updateContact = async (contactId, name, email, phone) => {
  const findContact = contacts.find(contact => contact.id.toString() === contactId)
  console.log(contactId)
  if (findContact) {
    findContact.name = name
    findContact.email = email
    findContact.phone = phone

    await fs.writeFile(contactsPath, JSON.stringify(contacts), error => {
      if (error) {
        return console.log('error :', error)
      }
    })
  }

  return findContact
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
