const express = require('express')
const app = express()
require('dotenv').config()
const Person = require('./mongo')
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})

app.use(express.json())

const errorHandler = (error, request, response, next) => {
    console.error(error.name)
    if (error.name === 'CastError') {
        return response.status(400).json({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        console.error(error.message)
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.get('/api/persons', (request, response, next) => {
    Person.find({})
        .then((data) => {
            if (data) {
                response.status(200).json(data)
            }
        })
        .catch((error) => next(error))
})
app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then((data) => {
            if (data) {
                response.status(200).json(data)
            }
        })
        .catch((error) => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const newPerson = new Person({
        name: request.body.name,
        number: request.body.number,
    })

    newPerson
        .save()
        .then((data) => {
            if (data) {
                response.status(200).json(data)
            }
        })
        .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndUpdate(
        request.params.id,
        { number: request.body.number },
        { new: true, runValidators: true }
    )
        .then((data) => {
            if (data) {
                response.status(200).json(data)
            }
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then((data) => {
            if (data) {
                response.status(200).json(data)
            }
        })
        .catch((error) => next(error))
})

app.use(errorHandler)
