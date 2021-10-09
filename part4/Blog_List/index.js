require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')


const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// eslint-disable-next-line no-undef
const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(console.log('connected successfully'))
    .catch(error => console.log(error))

app.use(cors())
app.use(express.json())

app.get('/', (request,response) =>{
    return response.send('<h1>small world</h1>')
})

app.get('/api/blogs', (request, response, next) => {
    Blog
        .find({})
        .then(blogs => {
            console.log('inside blog readout')
            response.json(blogs)
        })
        .catch(error => next(error))
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if(error.name==='ValidationError'){
        return response.status(400).send({ error: error.message })
    }else{
        console.log('logging the error in error handler')
        console.log(error)
    }

    next(error)
}

// handler of requests with result to errors
app.use(errorHandler)