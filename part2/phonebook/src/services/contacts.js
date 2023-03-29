import axios from "axios";

const dbUrl = "http://localhost:3001/phonebook";

const getAll = ({ handleError }) => {
  const request = axios.get(dbUrl);
  return request
    .then((response) => response.data)
    .catch((error) =>
      handleError({
        message: error.message,
        method: "getting contacts",
        error: true,
      })
    );
};

const create = ({ newContact, handleError }) => {
  const request = axios.post(dbUrl, newContact);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((error) =>
      handleError({
        message: error.message,
        method: "creating contact",
        error: true,
      })
    );
};

const update = ({ newContact, handleError }) => {
  const request = axios.put(`${dbUrl}/${newContact.id}`, newContact);
  return request
    .then((response) => response.data)
    .catch((error) =>
      handleError({
        message: error.message,
        method: "updating contact",
        error: true,
      })
    );
};

const deleteContact = ({ id, handleError }) => {
  const request = axios.delete(`${dbUrl}/${id}`);
  return request
    .then((response) => response)
    .catch((error) => {
      return handleError({
        message: error.message,
        method: "deleting contact",
        error: true,
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
