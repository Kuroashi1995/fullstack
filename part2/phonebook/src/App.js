import { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import ShowContacts from "./components/ShowContacts";
import SearchBar from "./components/SearchBar";
import dbContacts from "./services/contacts";

function App() {
  //States
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShownContacts] = useState(contacts);

  //Effects
  useEffect(() => {
    console.log("EffectStarted");
    dbContacts.getAll().then((contacts) => {
      console.log(contacts);
      setContacts(contacts);
      setShownContacts(contacts);
    });
  }, []);

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
      return true;
    } else {
      alert(`${newContact.name} already exists in the phonebook`);
      return false;
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
