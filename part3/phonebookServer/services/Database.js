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
  name: String,
  phone: String,
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
  const contact = new Contact(contactArg);
  await Contact.collection
    .insertOne(contact)
    .then(() => {
      console.log(
        `number ${contactArg.phone} for ${contactArg.name} saved succesfully`
      );
    })
    .catch((error) => {
      console.log(`an error ocurred: ${error}`);
    });
};

// const DB = {
//   getContacts: getContacts,
//   addContact: addContact,
// };
// module.exports = { DB };
