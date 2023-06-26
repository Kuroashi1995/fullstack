const mongoose = require("mongoose")
const { MONGODB_URI } = require("../utils/config")
const Contact = require("../models/contact")
const logger = require("../utils/logger")

mongoose.set("strictQuery", false)
mongoose.connect(MONGODB_URI)
  .then(() => logger.info("Connected to DB"))
  .catch((error) => logger.error("Error connecting to DB:", error.message))


getContacts = async () => {
  const result = await Contact.find({})
  return result
}

addContact = async (contactArg) => {
  logger.info('Add contact called')
  const contact = new Contact(contactArg)
  logger.info('Contact to be added: ', contact)
  await Contact.create(contact).catch((error) => {
    logger.error("error on add contact: ", error)
    throw error
  })
}

findContact = async (contactId) => {
  console.log("db find contact")
  const res = await Contact.findById(contactId)
  return res
}

deleteContact = async (contactId) => {
  const res = await Contact.findByIdAndDelete(contactId)
  return res
}

updateContact = async (contactId, contactArg) => {
  const res = await Contact.findByIdAndUpdate(contactId, contactArg, {
    runValidators: true,
  })
  return res
}

const storageService = {
  getContacts,
  addContact,
  findContact,
  deleteContact,
  updateContact
}

module.exports = storageService