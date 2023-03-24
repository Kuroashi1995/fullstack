const Contact = ({ contact }) => {
  return (
    <li>
      {"Nombre: " + contact.name}
      {" -> Numero: " + contact.phone}{" "}
    </li>
  );
};
export default Contact;
