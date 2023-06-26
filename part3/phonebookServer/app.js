const express = require("express")
const app = express()
const cors = require("cors")
const contactsRouter = require("./controllers/contacts")
const generalRouter = require("./controllers/general")
const logger = require("./utils/logger")
const middlewares = require("./utils/middleware")

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middlewares.requestInfo)
// app.use("/", generalRouter)
app.use("/api/persons", contactsRouter)
app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app