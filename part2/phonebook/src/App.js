import { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import ShowContacts from "./components/ShowContacts";
import SearchBar from "./components/SearchBar";
import dbContacts from "./services/contacts";
import Message from "./components/Message";

function App() {
  //States
  const [contacts, setContacts] = useState([]);
  const [showContacts, setShownContacts] = useState([]);
  const [message, setMessage] = useState({
    message: "",
    method: "",
    display: "no",
  });

  //Effects
  useEffect(() => {
    dbContacts.getAll({ handleMessage: handleMessage }).then((contacts) => {
      console.log(contacts);
      setContacts(contacts);
      setShownContacts(contacts);
    });
  }, []);

  //objects
  const messageObjetct = {
    message: "",
    method: "",
    display: "no",
  };

  //Functions
  //Add a contact
  const updateContacts = (newContact) => {
    if (
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      ) === undefined
    ) {
      dbContacts
        .create({ newContact: newContact, handleMessage: handleMessage })
        .then((responseContact) => {
          if (responseContact !== undefined) {
            setContacts(contacts.concat(responseContact));
            setShownContacts(contacts.concat(responseContact));
            handleMessage({
              ...messageObjetct,
              message: `${responseContact.name} created successfully`,
              display: "message",
            });
          }
        });

      return true;
    } else {
      const changeNumberConfirmation = window.confirm(
        `Change ${newContact.name} number to ${newContact.phone}?`
      );
      if (changeNumberConfirmation) {
        newContact = {
          ...contacts.find((contact) => contact.name === newContact.name),
          phone: newContact.phone,
        };
        dbContacts
          .update({ newContact: newContact, handleMessage: handleMessage })
          .then((responseContact) => {
            const newContacts = contacts.map((contact) => {
              return contact.id === responseContact.id
                ? newContact
                : contact;
            });
            setContacts(newContacts);
            setShownContacts(newContacts);
            handleMessage({
              ...messageObjetct,
              message: `${responseContact.name} phone changed to ${responseContact.phone} successfully`,
              display: "message",
            });
          });
        return true;
      }
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
      `Are you sure you want to delete ${contacts.find((contact) => contact.id === contactId).name
      }?`
    );
    if (confirmation) {
      let deleteIndex;
      let newContacts = [...contacts];
      dbContacts.deleteContact({ id: contactId, handleMessage: handleMessage });
      for (let index = 0; index <= contacts.length; index++) {
        if (contacts[index].id === contactId) {
          deleteIndex = index;
          break;
        }
      }
      newContacts.splice(deleteIndex, 1);
      setContacts(newContacts);
      setShownContacts(newContacts);
      handleMessage({
        ...messageObjetct,
        message: "Contact deleted successfully",
        display: "message",
      });
    }
  };
  const handleMessage = (message) => {
    setMessage(message);
    const displayingMessage = { ...message, display: "no" };
    setTimeout(() => {
      setMessage(displayingMessage);
    }, 5000);
  };

  //Component
  return message.display !== "no" ? (
    <div className="App">
      <h1>Phonebook</h1>
      <Message message={message} />
      <AddContact updateContacts={updateContacts} />
      <SearchBar manageSearch={handleSearch} />
      <ShowContacts contacts={showContacts} buttonCallback={deleteContact} />
    </div>
  ) : (
    <div className="App">
      <h1>Phonebook</h1>
      <AddContact updateContacts={updateContacts} />
      <SearchBar manageSearch={handleSearch} />
      <ShowContacts contacts={showContacts} buttonCallback={deleteContact} />
    </div>
  );
}

export default App;
