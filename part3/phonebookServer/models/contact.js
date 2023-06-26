const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: {
            validator: (v) => {
                return v.length >= 2
            },
            message: (props) => {
                props.value.length !== 0
                    ? "Name is not long enough"
                    : "Name is required"
            },
        },
        required: true,
    },
    phone: {
        type: String,
        validate: {
            validator: (v) => {
                const check = v.split("-")
                return (check.length === 2 || check.length === 3) && v.length > 8
            },
            message: (props) => {
                props.value.length !== 0 ? "Wrong number format" : "Phone is required"
            },
        },
        required: true,
    },
})

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Contact', contactSchema)