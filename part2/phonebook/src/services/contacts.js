import axios from "axios";

const dbUrl = "http://localhost:3001/phonebook";

const getAll = () => {
  const request = axios.get(dbUrl);
  return request.then((response) => response.data);
};

const create = ({ newContact }) => {
  const request = axios.post(dbUrl, newContact);
  return request.then((response) => {
    return response.data;
  });
};

const update = (id, newContact) => {
  const request = axios.put(`${dbUrl}/${id}`, newContact);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${dbUrl}/${id}`);
  return request.then((response) => response);
};

//definition for the export
const dbContacts = {
  getAll: getAll,
  create: create,
  update: update,
  deleteContact: deleteContact,
};

export default dbContacts;
