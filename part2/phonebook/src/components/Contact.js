const Contact = ({ contact, handleClick }) => {
  return (
    <li className="contact">
      {"Nombre: " + contact.name}
      {" -> Numero: " + contact.phone}{" "}
      <button type="button" onClick={() => handleClick(contact.id)}>
        Delete Contact
      </button>
    </li>
  );
};
export default Contact;
