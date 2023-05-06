const express = require("express");
const app = express();

app.use(express.json());

const generateId = () => {
  id = Math.round(1 + Math.random() * 100);
  return id;
};
data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  id = Number(request.params.id);
  contact = data.find((contact) => contact.id === id);
  contact ? response.json(contact) : response.status(404).end();
});

app.get("/info", (request, response) => {
  response.send(
    `<div><p>This phonebook cointains information about ${
      data.length
    } people</p> <p>${Date(Date.now())}</p></div>`
  );
});

app.post("/api/persons", (request, response) => {
  id = generateId();
  const body = request.body;
  console.log(body);
  if (!body.name || !body.number) {
    response.status(400).json({
      error: "missing content",
    });
  }
  const contact = {
    id: id,
    name: body.name,
    number: body.number,
  };
  data = data.concat(contact);
  response.json(contact);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
