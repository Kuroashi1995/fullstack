import { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import ShowContacts from "./components/ShowContacts";
import SearchBar from "./components/SearchBar";
import dbContacts from "./services/contacts";

function App() {
  //States
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShownContacts] = useState([]);

  //Effects
  useEffect(() => {
    console.log("effect triggered");
    dbContacts.getAll().then((contacts) => {
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
      dbContacts.create({ newContact }).then((responseContact) => {
        setContacts(contacts.concat(responseContact));
        setShownContacts(contacts.concat(responseContact));
      });

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

  const deleteContact = (contactId) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete ${
        contacts.find((contact) => contact.id === contactId).name
      }?`
    );
    if (confirmation) {
      let deleteIndex;
      let newContacts = [...contacts];
      dbContacts.deleteContact(contactId);
      for (let index = 0; index <= contacts.length; index++) {
        if (contacts[index].id === contactId) {
          deleteIndex = index;
          break;
        }
      }
      console.log("App > deleteContact > newContactsVar", newContacts);
      newContacts.splice(deleteIndex, 1);
      console.log("App > deleteContact > newContactsVarSpliced", newContacts);
      setContacts(newContacts);
      console.log("llega a App > deleteContact > setContacts");
      setShownContacts(newContacts);
      console.log("LLega a App > deleteContact > setShownContacts");
    }
  };

  //Component
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <AddContact updateContacts={updateContacts} />
      <SearchBar manageSearch={handleSearch} />
      <ShowContacts contacts={showContacts} buttonCallback={deleteContact} />
    </div>
  );
}

export default App;
