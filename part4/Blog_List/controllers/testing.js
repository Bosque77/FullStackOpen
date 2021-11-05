const testingRouter = require('express').Router()
const testHelper = require('../tests/test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

testingRouter.post('/reset', async (request,response) => {
    console.log('inside testing router')
    await Blog.deleteMany({})
    await User.deleteMany({})

    // let test_user = testHelper.user
    // let username = test_user.username
    // let name = test_user.name
    // let password = test_user.password

    // let salt_rounds = 10
    // let passwordHash = await bcrypt.hash(password, salt_rounds)

    // const user = new User({
    //     username,
    //     name,
    //     passwordHash,
    // })

    // await user.save()

    response.status(204).end()
})

testingRouter.get('/seeddb', async(request,response) =>{
    console.log('inside testing seed db')
    await Blog.deleteMany({})
    await User.deleteMany({})
    let test_user = testHelper.user


    let salt_rounds = 10
    let passwordHash = await bcrypt.hash(test_user.password, salt_rounds)


    const user = new User({
        _id: test_user.id,
        username: test_user.username,
        name: test_user.name,
        passwordHash: passwordHash,
    })

    await user.save()

    let blogs = testHelper.blogs_w_user
    let blogs_array = blogs.map(blog => Blog(blog))

    const promiseArray = blogs_array.map(blog => blog.save())
    await Promise.all(promiseArray)
    response.status(200).end()
})


module.exports = testingRouter