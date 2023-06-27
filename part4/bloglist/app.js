const express = require("express")
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const middleware = require("./utils/middleware")

app = express()

app.use(cors())
app.use(express.json())
app.use(middleware.requestDetails)
app.use("/api/blogs", blogsRouter)

module.exports = app