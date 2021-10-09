const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)



app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
  // eslint-disable-next-line no-undef
  console.log(process.env.PORT)
})

app.get('/info', (request, response) => {
  Person.count({}).then(num_of_people => {
    let time_stamp = new Date()
    let return_str = `Phonebook has info for ${num_of_people} people \n ${time_stamp}`
    response.send(return_str)
  })

})

app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(person => {
    return response.json(person)
  })
    .catch(error => next(error))
}
)

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      response.json(person)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {

  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id',(request,response,next) => {

  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  console.log('about to look up the person by id and update')
  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true  })
    .then(updatedPerson => {
      console.log('inside updatedPerson')
      response.json(updatedPerson)
    })
    .catch(error => {
      console.log(error)
      next(error)

    })
})

app.post('/api/persons',(request,response,next) => {
  console.log('inside posting the person')
  let data = request.body
  console.log(data)

  const person = new Person({
    name: data.name,
    number: data.number,
    date: new Date(),
  })

  person.save().then(savedNote => {
    response.json(savedNote)
  }).catch(error => next(error))
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name==='ValidationError'){
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

// handler of requests with result to errors
app.use(errorHandler)