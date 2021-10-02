const express = require('express')
const morgan = require('morgan')
const cors = require('cors')


const app = express()


app.use(cors())
app.use(express.json())

morgan.token('content', function getContent (req) {
    return JSON.stringify(req.body)
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    let num_of_people = persons.length
    let time_stamp = new Date()
    let return_str = `Phonebook has info for ${num_of_people} people \n ${time_stamp}`
    response.send(return_str)
})

app.get('/api/persons', (request, response) => {
    console.log(request.body)
    console.log(persons)

    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    let person = persons.find(person => person.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }

})


app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()

})

app.post('/api/persons',(request,response) =>{
    let person = request.body

    let names = persons.map(existing_person => existing_person.name.toLowerCase())
    if(names.includes(person.name.toLowerCase())){
        return response.status(400).json({error: 'name already exists in the phonebook'})
    }else if(person.name && person.number){
        person.id = parseInt(Math.random()*10000000)
        persons = persons.concat(person)
        response.json(person)
    }else{
        return response.status(400).json({error: 'name and phone number must be defined'})
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})