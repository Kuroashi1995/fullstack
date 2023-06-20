const {
  getContacts,
  addContact,
  findContact,
  deleteContact,
  updateContact,
} = require("./services/Database")
const express = require("express")
var morgan = require("morgan")
const app = express()
const cors = require("cors")

const errorHandler = (error, request, response, next) => {
  console.error("se corrio error handler", error.name)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: "missing or incorrect content" })
  }

  next(error)
}

//middlewares
const unknownEndpoint = (error, request, response, next) => {
  if (error) {
    next(error)
  }
  response.status(404).send({
    error: "unknown endpoint",
  })
}
morgan.token("body", (req, res) => {
  return `${JSON.stringify(req.body)}`
})

app.use(cors())
app.use(express.static("build"))
app.use(express.json())
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
    ].join(" ")
  })
)

app.get("/", (request, response) => {
  response.send("<h1> Welcome to my Phonebook </h1>")
})
app.get("/api/persons", async (request, response, next) => {
  try {
    response.json(await getContacts())
  } catch (error) {
    (error) => next(error)
  }
})

app.put("/api/persons/:id", async (request, response, next) => {
  console.log(`Request body: ${JSON.stringify(request.body)}`)
  const contactArg = {
    name: request.body.name,
    phone: request.body.phone,
  }
  try {
    contact = await updateContact(request.params.id, contactArg)
    contact ? response.json(contact) : response.status(404).end()
  } catch (error) {
    next(error)
  }
})

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    contact = await findContact(request.params.id)
    contact ? response.json(contact) : response.status(404).end()
  } catch (error) {
    next(error)
  }
})

app.get("/info", async (request, response, next) => {
  try {
    contacts = await getContacts()
    response.send(
      `<div><p>This phonebook cointains information about ${contacts.length
      } people</p> <p>${Date(Date.now())}</p></div>`
    )
  } catch (error) {
    (error) => next(error)
  }
})

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    deletion = await deleteContact(request.params.id)
    deletion ? response.status(204).end() : response.status(404).end()
  } catch (error) {
    (error) => next(error)
  }
})

app.post("/api/persons", async (request, response, next) => {
  const body = request.body
  try {
    const contacts = await getContacts()
    if (contacts.find((contact) => contact.name === body.name)) {
      response.status(400).json({
        error: "name must be unique",
      })
    }
    const contact = {
      name: body.name,
      phone: body.phone,
    }
    await addContact(contact)
    response.json(contact)
  } catch (error) {
    next(error)
  }
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
