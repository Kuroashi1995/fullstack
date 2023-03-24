import { useState } from "react";
import AddContact from "./components/AddContact";
import ShowContacts from "./components/ShowContacts";

function App() {
  //States
  const [contacts, setContacts] = useState([
    { name: "Andrew", phone: "099Solido" },
  ]);

  //Functions
  const updateContacts = (newContact) => {
    console.log("updateContacts", newContact);
    if (
      contacts.find(
        (contact) =>
          contact.name.toLowerCase() === newContact.name.toLowerCase()
      ) === undefined
    ) {
      setContacts(contacts.concat(newContact));
    } else {
      alert(`${newContact.name} already exists in the phonebook`);
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
