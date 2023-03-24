import Contact from "./Contact";

const ShowContacts = ({ contacts }) => {
  return (
    <div>
      <h2>Contacts:</h2>
      <ul>
        {contacts.map((contact) => (
          <Contact contact={contact} key={contact.name}/>
        ))}
      </ul>
    </div>
  );
};
export default ShowContacts;
