const mongoose = require("mongoose")
require("dotenv").config()

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGODB_URI)

var db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
  console.log("db connection succesful")
})

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length >= 2
      },
      message: (props) => {
        props.value.length !== 0
          ? "Name is not long enough"
          : "Name is required"
      },
    },
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        const check = v.split("-")
        return (check.length === 2 || check.length === 3) && v.length > 8
      },
      message: (props) => {
        props.value.length !== 0 ? "Wrong number format" : "Phone is required"
      },
    },
    required: true,
  },
})
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Contact = mongoose.model("Contact", contactSchema, "contacts")

module.exports.getContacts = async () => {
  const result = await Contact.find({})
  return result
}

module.exports.addContact = async (contactArg) => {
  const contact = new Contact(contactArg)
  await Contact.create(contact).catch((error) => {
    throw error
  })
}

module.exports.findContact = async (contactId) => {
  console.log("db find contact")
  const res = await Contact.findById(contactId)
  return res
}

module.exports.deleteContact = async (contactId) => {
  const res = await Contact.findByIdAndDelete(contactId)
  return res
}

module.exports.updateContact = async (contactId, contactArg) => {
  const res = await Contact.findByIdAndUpdate(contactId, contactArg, {
    runValidators: true,
  })
  return res
}
