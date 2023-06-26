const morgan = require("morgan")
const logger = require("../utils/logger")

const body = morgan.token("body", (req) => {
    return `${JSON.stringify(req.body)}`
})

const requestInfo = morgan((tokens, req, res) => {
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

const errorHandler = (error, request, response, next) => {
    logger.error("Ocurrio un error", error.name)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: "missing or incorrect content" })
    }

    next(error)
}

const unknownEndpoint = (error, request, response, next) => {
    if (error) {
        next(error)
    }
    response.status(404).send({
        error: "unknown endpoint",
    })
}


module.exports = {
    requestInfo,
    errorHandler,
    unknownEndpoint,
}
