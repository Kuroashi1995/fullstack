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

data = [
  {
    id: 1,
    name: "Arto Hellas",
    phone: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    phone: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    phone: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    phone: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1> Welcome to my Phonebook </h1>");
});
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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((contact) => contact.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  id = generateId();
  const body = request.body;
  console.log(body);
  if (!body.name || !body.phone) {
    response.status(400).json({
      error: "missing content",
    });
  } else if (data.find((contact) => contact.name === body.name)) {
    response.status(400).json({
      error: "name must be unique",
    });
  }
  const contact = {
    id: id,
    name: body.name,
    phone: body.phone,
  };
  data = data.concat(contact);
  response.json(contact);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
