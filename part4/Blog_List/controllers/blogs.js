const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', (request, response) => {
    Blog.find({}).populate('user').then(Blogs => {
        response.json(Blogs.map(Blog => Blog.toJSON()))
    })
})

blogsRouter.get('/user', middleware.userExtractor, async (request, response) => {
    const current_user = request.user

    let blogs = await Blog
        .find({ user:current_user }).populate('user', { username: 1, name: 1 })

    console.log(blogs)
    response.json(blogs.map(blog => blog.toJSON()))

    // Blog.find({ user:current_user }).populate('user',{ username: 1, name: 1 }).then(Blogs => {
    //     response.json(Blogs.map(Blog => Blog.toJSON()))
    // })
})

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
        .then(Blog => {
            if (Blog) {
                response.json(Blog.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

blogsRouter.post('/', middleware.userExtractor ,async (request, response) => {

    const body = request.body
    const user = request.user


    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        date: new Date(),
        user: user.id
    })

    let returned_blog = await blog.save()

    user.blogs = user.blogs.concat(returned_blog._id)
    await user.save()
    response.json(returned_blog.toJSON())
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    console.log('inside delete blog')
    const user = request.user
    // eslint-disable-next-line no-undef
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === user.id.toString() ) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    }else{
        response.status(401).end()
    }


})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const updated_blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }


    const blog = await Blog.findById(request.params.id)
    if ( blog.user.toString() === user.id.toString() ) {
        let returned_blog = await Blog.findByIdAndUpdate(request.params.id,updated_blog, { new:true })
        response.json(returned_blog.toJSON())
    }else{
        response.status(401).end()
    }
})

module.exports = blogsRouter