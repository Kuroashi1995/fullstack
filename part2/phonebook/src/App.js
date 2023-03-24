import { useState } from "react";
import AddContact from "./components/AddContact";
import ShowContacts from "./components/ShowContacts";

function App() {
  //States
  const [contacts, setContacts] = useState([{ id: 1, name: "Andrew Halley" }]);

  //Functions
  const updateContacts = (contactName) => {
    console.log(
      "updateContacts",
      contacts.find(
        (contact) => contact.name.toLowerCase() === contactName.toLowerCase()
      )
    );
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === contactName.toLowerCase()
      ) === undefined
    ) {
      const contactObject = { id: contacts.length + 1, name: contactName };
      setContacts(contacts.concat(contactObject));
    } else {
      alert("Contact already exists");
    }
  };

  //Component
  return (
    <div className="App">
      <h1>Phonebook</h1>
      <AddContact updateContacts={updateContacts} />
      <ShowContacts contacts={contacts} />
    </div>
  );
}

export default App;
