import axios from "axios";

const dbUrl = "http://localhost:3001/phonebook";

const getAll = () => {
  const request = axios.get(dbUrl);
  return request
    .then((response) => response.data)
    .catch((error) => alert(`Cannot get contacts, error: ${error}`));
};

const create = ({ newContact }) => {
  const request = axios.post(dbUrl, newContact);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((error) => alert(`Cannot create contact, error: ${error}`));
};

const update = ({ newContact }) => {
  console.log("Contacts service > update > newContact =", newContact);
  const request = axios.put(`${dbUrl}/${newContact.id}`, newContact);
  return request
    .then((response) => response.data)
    .catch((error) => alert(`Cannot update contact, error: ${error}`));
};

const deleteContact = (id) => {
  const request = axios.delete(`${dbUrl}/${id}`);
  return request
    .then((response) => response)
    .catch((error) => alert(`Cannot delete contact, error: ${error}`));
};

//definition for the export
const dbContacts = {
  getAll: getAll,
  create: create,
  update: update,
  deleteContact: deleteContact,
};

export default dbContacts;
