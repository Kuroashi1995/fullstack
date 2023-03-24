const ShowContacts = ({ contacts }) => {
  return (
    <div>
      <h2>Contacts:</h2>
      <ul>
        {contacts.map((contact, index) => (
          <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
    </div>
  );
};
export default ShowContacts;
