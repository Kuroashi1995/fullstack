import { useState } from "react";
import AddContact from "./components/AddContact";
import ShowContacts from "./components/ShowContacts";
import SearchBar from "./components/SearchBar";

function App() {
  //States
  const [contacts, setContacts] = useState([
    { name: "Andrew", phone: "099Solido" },
  ]);
  const [showContacts, setShownContacts] = useState(contacts);

  //Functions
  const updateContacts = (newContact) => {
    if (
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      ) === undefined
    ) {
      setContacts(contacts.concat(newContact));
      setShownContacts(contacts.concat(newContact));
    } else {
      alert(`${newContact.name} already exists in the phonebook`);
    }
  };

  const handleSearch = (searchText) => {
    if (searchText !== "") {
      const newShowContacts = contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setShownContacts(newShowContacts);
    } else {
      setShownContacts(contacts);
    }
  };

  //Component
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <AddContact updateContacts={updateContacts} />
      <SearchBar manageSearch={handleSearch} />
      <ShowContacts contacts={showContacts} />
    </div>
  );
}

export default App;
