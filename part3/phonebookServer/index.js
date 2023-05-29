const { getContacts, addContact } = require("./services/Database");
const express = require("express");
var morgan = require("morgan");
const app = express();
const cors = require("cors");

const generateId = () => {
  id = Math.round(1 + Math.random() * 100);
  return id;
};

//middlewares
const unknownEndpoint = (request, response, next) => {
  response.status(404).send({
    error: "unknown endpoint",
  });
};
morgan.token("body", (req, res) => {
  return `${JSON.stringify(req.body)}`;
});

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
      tokens.body(req, res),
    ].join(" ");
  })
);

app.get("/", (request, response) => {
  response.send("<h1> Welcome to my Phonebook </h1>");
});
app.get("/api/persons", async (request, response) => {
  response.json(await getContacts());
});

app.get("/api/persons/:id", (request, response) => {
  id = Number(request.params.id);
  contact = getContacts().find((contact) => contact.id === id);
  contact ? response.json(contact) : response.status(404).end();
});

app.get("/info", (request, response) => {
  response.send(
    `<div><p>This phonebook cointains information about ${
      getContacts().length
    } people</p> <p>${Date(Date.now())}</p></div>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  console.log("not implemented");
});

app.post("/api/persons", async (request, response) => {
  const body = request.body;
  const contacts = await getContacts();
  console.log(body);
  if (!body.name || !body.phone) {
    response.status(400).json({
      error: "missing content",
    });
  } else if (contacts.find((contact) => contact.name === body.name)) {
    response.status(400).json({
      error: "name must be unique",
    });
  }
  const contact = {
    name: body.name,
    phone: body.phone,
  };
  await addContact(contact);
  response.json(contact);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
