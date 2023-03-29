import axios from "axios";

const dbUrl = "http://localhost:3001/phonebook";

const getAll = ({ handleMessage }) => {
  const request = axios.get(dbUrl);
  return request
    .then((response) => response.data)
    .catch((error) =>
      handleMessage({
        message: error.message,
        method: "getting contacts",
        display: "error",
      })
    );
};

const create = ({ newContact, handleMessage }) => {
  const request = axios.post(dbUrl, newContact);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      handleMessage({
        message: error.message,
        method: "creating contact",
        display: "error",
      })
    );
};

const update = ({ newContact, handleMessage }) => {
  const request = axios.put(`${dbUrl}/${newContact.id}`, newContact);
  return request
    .then((response) => response.data)
    .catch((error) =>
      handleMessage({
        message: error.message,
        method: "updating contact",
        display: "error",
      })
    );
};

const deleteContact = ({ id, handleMessage }) => {
  const request = axios.delete(`${dbUrl}/${id}`);
  return request
    .then((response) => response)
    .catch((error) => {
      return handleMessage({
        message: error.message,
        method: "deleting contact",
        display: "error",
      });
    });
};

//definition for the export
const dbContacts = {
  getAll: getAll,
  create: create,
  update: update,
  deleteContact: deleteContact,
};

export default dbContacts;
