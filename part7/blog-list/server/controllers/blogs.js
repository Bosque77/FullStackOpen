const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')




blogsRouter.get('/', (request, response) => {
    Blog.find({}).populate('user',{ username: 1, name: 1 }).then(Blogs => {
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
    Blog.findById(request.params.id).populate('user',{ username: 1, name: 1 })
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
    await returned_blog.populate('user',{username: 1, name: 1})

    user.blogs = user.blogs.concat(returned_blog._id)
    await user.save()
    response.json(returned_blog.toJSON())
})


blogsRouter.post('/:id/comments', async (request,response) => {
    console.log('inside blogsrouter post')
    const body = request.body

    console.log(body)
    const blog = await Blog.findById(request.params.id)
    let comment = body.comment
    blog.comments.push(comment)
    let returned_blog = await Blog.findByIdAndUpdate(request.params.id,blog, { new:true })
    await returned_blog.populate('user',{username: 1, name: 1})
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



// THIS PIECE OF CODE IS NOT GREAT BEACAUSE ANY PUT REQUEST JUST INCREASES THE LIKE ON THE BLOG
// PROBABLY NEED TO IMPLEMENT A SEPARTE SERVER SIDE FUNCTION FOR DOING THIS IF I WANTED TO DO IT CORRECTLY
blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
    // const body = request.body
    // const user = request.user


    const blog = await Blog.findById(request.params.id)
    blog.likes = blog.likes+1
    let returned_blog = await Blog.findByIdAndUpdate(request.params.id,blog, { new:true })
    await returned_blog.populate('user',{username: 1, name: 1})
    response.json(returned_blog.toJSON())
    // if ( blog.user.toString() === user.id.toString() ) {
    //     let returned_blog = await Blog.findByIdAndUpdate(request.params.id,updated_blog, { new:true })
    //     await returned_blog.populate('user',{username: 1, name: 1})
    //     response.json(returned_blog.toJSON())
    // }else{
    //     response.status(401).end()
    // }
})

module.exports = blogsRouter