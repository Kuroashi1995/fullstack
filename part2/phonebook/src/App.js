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
    console.log("App > updateContacts > newContact = ", newContact);
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
      const changeNumberConfirmation = window.confirm(
        `change ${newContact.name} number to ${newContact.phone}?`
      );
      if (changeNumberConfirmation) {
        newContact = {
          ...contacts.find((contact) => contact.name === newContact.name),
          phone: newContact.phone,
        };
        dbContacts
          .update({ newContact: newContact })
          .then((responseContact) => {
            console.log(
              "App > updateContacts > update > then > responseContact = ",
              responseContact
            );
            const newContacts = contacts.map((contact) => {
              return contact.id === responseContact.id
                ? responseContact
                : contact;
            });
            setContacts(newContacts);
            setShownContacts(newContacts);
          });
        return true;
      } else {
        return false;
      }
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
      newContacts.splice(deleteIndex, 1);
      setContacts(newContacts);
      setShownContacts(newContacts);
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
