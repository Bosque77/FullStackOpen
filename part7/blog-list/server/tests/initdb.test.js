
const helper = require('../utils/db.helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')

beforeEach(async () => {

    // Creating all of the Initial Users
    let initial_users =helper.users
    console.log(initial_users)
    await User.deleteMany({})

    const userObjects = initial_users.map(user => new User(user))
    let promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)

    await Blog.deleteMany({})


    const blogObjects = helper.initialBlogs
    blogObjects.map(blog => new Blog(blog))
    promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    mongoose.connection.close()
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


afterAll(() => {
    mongoose.connection.close()
})