import axios from "axios";

const dbUrl = "http://localhost:3001/phonebook";

const getAll = () => {
  const request = axios.get(dbUrl);
  return request.then((response) => response.data);
};

const create = ({ newContact }) => {
  console.log("Contacts repo > Create > newContact argument >", newContact);
  const request = axios.post(dbUrl, newContact);
  return request.then((response) => {
    console.log("Contacts repo > Create > POST response > ", response);
    return response.data;
  });
};

const update = (id, newContact) => {
  const request = axios.put(`${dbUrl}/${id}`, newContact);
  return request.then((response) => response.data);
};

//definition for the export
const dbContacts = {
  getAll: getAll,
  create: create,
  update: update,
};

export default dbContacts;
