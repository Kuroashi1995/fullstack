const ShowContacts = ({ contacts }) => {
  return (
    <div>
      <h2>Contacts:</h2>
      <ul>
        {contacts.map((contact) => (
          <li key={contact.name}>
            {"Nombre: " + contact.name}
            {" -> Numero: " + contact.phone}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ShowContacts;
