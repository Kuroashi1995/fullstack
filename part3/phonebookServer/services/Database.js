const { response, request } = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("db connection succesful");
});

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length >= 2;
      },
      message: (props) => {
        props.value.length !== 0
          ? "Name is not long enough"
          : "Name is required";
      },
    },
    required: true,
  },
  phone: {
    type: String,
    validate: {
      validator: (v) => {
        return v.length >= 5;
      },
      message: (props) => {
        props.value.length !== 0
          ? "Phone is not long enough"
          : "Phone is required";
      },
    },
    required: true,
  },
});
contactSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = mongoose.model("Contact", contactSchema, "contacts");

module.exports.getContacts = async () => {
  result = await Contact.find({});
  // mongoose.connection.close();
  return result;
};

module.exports.addContact = async (contactArg) => {
  console.log(`Contact argument: ${contactArg}`);
  const contact = new Contact(contactArg);
  console.log(`Contact after schema: ${contact}`);
  await Contact.create(contact).catch((error) => {
    console.log(`an error ocurred: ${error}`);
  });
};

module.exports.findContact = async (contactId) => {
  console.log("db find contact");
  res = await Contact.findById(contactId);
  return res;
};

module.exports.deleteContact = async (contactId) => {
  res = await Contact.findByIdAndDelete(contactId);
  console.log(res);
  return res;
};

module.exports.updateContact = async (contactId, contactArg) => {
  console.log(`contact: ${JSON.stringify(contactArg)}`);
  res = await Contact.findByIdAndUpdate(contactId, contactArg, {
    runValidators: true,
  });
  console.log(res);
  return res;
};
