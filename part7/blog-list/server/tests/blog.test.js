const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const list_helper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


let user
let token
let incorrect_token

beforeEach(async () => {
    await Blog.deleteMany({})

    let users = await User.find({})
    user = users[0]
    let user_id = user.id.toString()
    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // eslint-disable-next-line no-undef
    token = jwt.sign(userForToken, process.env.SECRET)
    console.log(token)
    incorrect_token = token.substring(3)


    const blogObjects = helper.initialBlogs
        .map(blog => {
            blog['user'] = user_id
            console.log(blog)
            return new Blog(blog)
        })
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('when there is initially some blogs saved', () => {
    test('see how many blogs there are', async () => {

        const response = await api.get('/api/blogs')
        let blogs = response.body
        expect(blogs.length).toEqual(2)
    })

    test('see if blog contains the id property', async () => {

        const response = await api.get('/api/blogs')
        let blogs = response.body
        expect(blogs[0].id).toBeDefined()
    })
})



describe('creating new blogs', () => {
    test('posting new blog', async () => {
        let new_blog = helper.new_blog
        console.log('about to create the new blog post')
        let response = await api.post('/api/blogs').send(new_blog).auth(token, { type: 'bearer' })
        response = await api.get('/api/blogs')
        let blogs = response.body
        let number_of_blogs = blogs.length
        expect(number_of_blogs).toEqual(3)
    },10000)

})

describe('testing helper numberOfLikes function', () => {
    test('blog w no likes', () =>{
        let blog = helper.blog_w_no_likes
        let number_of_likes = list_helper.numberOfLikes(blog)
        expect(number_of_likes).toEqual(0)
    })

    test('blog w likes', () =>{
        let blog = helper.new_blog
        let number_of_likes = list_helper.numberOfLikes(blog)
        expect(number_of_likes).toEqual(265)
    })

})


describe('illformed posts',() => {

    test('posting blog with no title', async () =>{
        let ill_blog = helper.illformed_blog_1
        await api.post('/api/blogs').send(ill_blog).auth(token, { type: 'bearer' })
            .expect(400)
    })

    test('posting blog with no url', async () =>{
        let ill_blog = helper.illformed_blog_2
        await api.post('/api/blogs').send(ill_blog).auth(token, { type: 'bearer' })
            .expect(400)
    })

    test('incorrect user token', async () =>{
        let blog = helper.new_blog
        await api.post('/api/blogs').send(blog).auth(incorrect_token, { type: 'bearer' })
            .expect(401)
    })

})

describe('Delete requests', () =>{

    test('delete object with id', async () =>{
        let blog_id = helper.first_id
        await api.delete(`/api/blogs/${blog_id}`).auth(token, { type: 'bearer' })
            .expect(204)
    })
})

describe('Changing blogs posts with PUT requests', () =>{
    test('update object with id', async () =>{

        let updated_blog = helper.updated_blog
        let blog_id = updated_blog._id
        let response = await api.put(`/api/blogs/${blog_id}`).send(updated_blog).auth(token, { type: 'bearer' })
        expect(response.body.likes).toEqual(56)
    })
})

afterAll(() => {
    mongoose.connection.close()
})