const mongoose = require('mongoose')
require('dotenv').config()
const uniqueValidator = require('unique-validator')
const uri = process.env.MONGODB_URI

mongoose
    .connect(uri)
    .then((result) => {
        if (result) {
            console.log('Connected to Mongo')
        }
    })
    .catch((err) => {
        console.log(err)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        minlength: [3, 'Need at least 3 characters'],
    },
    number: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true,
        minlength: [
            9,
            'Pleaser enter a valid phone NUMBER, must be 9 digits and format 123-45678',
        ],
        maxlength: [
            9,
            'Pleaser enter a valid phone NUMBER, must be 9 digits and format 123-45678',
        ],
        validate: {
            validator: (newNumber) => {
                return /\d{3}-\d{5}/.test(newNumber)
            },
            message: (props) =>
                `${props.value} is not a valid phone number! Please use the format '123-45678'.`,
        },
    },
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = new mongoose.model('Person', personSchema)
