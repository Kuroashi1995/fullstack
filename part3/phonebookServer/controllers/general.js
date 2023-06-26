const generalRouter = require("express").Router()

generalRouter.get("/", (req, res, next) => {
    try {
        response.send("<h1> Welcome to my Phonebook </h1>")
    }
    catch (error) {
        next(error)
    }
})

generalRouter.get("/info", async (req, res, next) => {
    try {
        const contacts = await getContacts()
        response.send(
            `<div><p>This phonebook cointains information about ${contacts.length
            } people</p> <p>${Date(Date.now())}</p></div>`
        )
    }
    catch (error) {
        next(error)
    }
})

module.exports = generalRouter