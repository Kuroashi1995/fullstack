const contactsRouter = require('express').Router()
const storageService = require('../services/Database')
const Contact = require('../models/contact')
const logger = require("../utils/logger")

//get contacts

contactsRouter.get("/", async (request, response, next) => {
    logger.info('entre a /')
    try {
        const contacts = await Contact.find({})
        logger.info("contacts: ", contacts)
        response.json(contacts)
    }
    catch (error) {
        (error) => next(error)
    }
})

//get specific contact

contactsRouter.get("/:id", async (request, response, next) => {
    try {
        const contact = await storageService.findContact(request.params.id)
        response.json(contact)
    }
    catch (error) {
        (error) => next(error)
    }
})

//create contact

contactsRouter.post("/", async (request, response, next) => {
    logger.info('Called POST on /')
    const body = request.body
    logger.info('body of request: ', body)
    try {
        const contacts = await storageService.getContacts()
        logger.info("contacts: ", contacts)
        if (contacts.find((contact) => contact.name === body.name)) {
            response.status(400).json({
                error: "Name must be unique"
            })
        }
        else {
            logger.info('called else')
            contact = {
                name: body.name,
                phone: body.phone
            }
            await storageService.addContact(contact)
            response.json(contact)
        }
    }
    catch (error) { next(error) }
})

//update contact

contactsRouter.put("/:id", async (request, response, next) => {
    const contactArg = {
        name: request.body.name,
        phone: request.body.phone
    }
    try {
        const contact = await storageService.updateContact(request.params.id, contactArg)
        contact ? response.json(contact) : response.status(404).end()
    }
    catch (error) {
        next(error)
    }
})

//delete contact

contactsRouter.delete("/:id", async (request, response, next) => {
    try {
        const deletion = storageService.deleteContact(request.params.id)
        deletion ? response.status(204).end() : response.status(404).end()
    }
    catch (error) {
        next(error)
    }
})

module.exports = contactsRouter