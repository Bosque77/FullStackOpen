const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { TestWatcher } = require('@jest/core')
const Blog = require('../models/blog')


let user = {
    username: 'forestschwrtz',
    name: 'Bosque77',
    password: 'Forest',
}

let incorrect_user = {
    username: 'jdog',
    name: 'jdog143',
    password: 'treeman',
}


// describe('Testing user login access', () =>{
//     test('user login test',async ()=>{
//         let response = await api.post('/login').send(user)
//         let token = response.body.token
//         expect(token).toBeDefined()
//     })
// })

describe('Testing Login Methods',() => {
    test('creating a blog post', async () => {
        let response = await api.post('/login').send(user)

        let token = response.body.token

        let blog = helper.new_blog
        console.log('about to send the blog post')
        response = await api.post('/api/blogs').send(blog).auth(token, { type: 'bearer' })
        expect(response.body.author).toEqual('Blog Boy')
        console.log(response.body)

    },10000)

    test('deleting a blog post with incorrect user id', async () => {
        let response = await api.post('/login').send(incorrect_user)

        let token = response.body.token

        blogs = await Blog.find({author: 'Blog Boy'})
        let blog = blogs[0].toJSON()
        let blog_id = blog.id
        
        response = await api.delete(`/api/blogs/${blog_id}`).auth(token, { type: 'bearer' })
        expect(401)
    },10000)

    test('deleting a blog post with correct user id', async () => {
        let response = await api.post('/login').send(user)

        let token = response.body.token

        blogs = await Blog.find({author: 'Blog Boy'})
        let blog = blogs[0].toJSON()
        let blog_id = blog.id
        
        response = await api.delete(`/api/blogs/${blog_id}`).auth(token, { type: 'bearer' })
        console.log(response.body)
        expect(204)
    },10000)
})


afterAll(() => {
    mongoose.connection.close()
}) 