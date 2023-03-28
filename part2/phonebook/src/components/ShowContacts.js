import Contact from "./Contact";

const ShowContacts = ({ contacts, buttonCallback }) => {
  return (
    <div>
      <h2>Contacts:</h2>
      <ul>
        {contacts.map((contact) => (
          <Contact
            contact={contact}
            key={contact.name}
            handleClick={buttonCallback}
          />
        ))}
      </ul>
    </div>
  );
};
export default ShowContacts;
