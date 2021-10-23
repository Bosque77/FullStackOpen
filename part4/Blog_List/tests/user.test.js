const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const bcrypt = require('bcrypt')


let salt_rounds = 10


let createUsers = async() => {
    let password_1 = await bcrypt.hash('Forest', salt_rounds)
    let password_2 = await bcrypt.hash('password', salt_rounds)
    let data = [
        {   _id: '616b687bb8c0c73106c7c7a1',
            username: 'forestschwrtz',
            name: 'Bosque77',
            passwordHash: password_1,
        },
        {
            username: 'bobbybrown',
            name: 'heartbreakers2',
            passwordHash: password_2,
        }
    ]

    return data
}


beforeEach(async () => {
    let initial_users = await createUsers()
    console.log(initial_users)
    await User.deleteMany({})
    const userObjects = initial_users.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
})


describe('Getting Users',() =>{
    test('Getting All Users', async () =>{
        const response = await api.get('/api/users')
        let returned_users = response.body
        expect(returned_users.length).toEqual(2)
    })

    test('getting user by id', async () =>{
        const response = await api.get('/api/users/616b687bb8c0c73106c7c7a1')
        let returned_user = response.body
        console.log(returned_user)
        expect(returned_user.username).toEqual('forestschwrtz')
    })


})

let new_user = {
    username: 'new_user',
    name: 'check it out',
    password: 'disfrute',
}

let incorrect_user = {
    username: '',
    name: 'check it out',
    password: 'disfrute',
}

let repeate_user_name ={
    username: 'forestschwrtz',
    name: 'nipper',
    password: 'slagmouth',
}


describe('Posting new Users', ()=>{
    test('creating a new user', async () => {
        const response = await api.post('/api/users').send(new_user)
        let returned_user = response.body
        console.log(returned_user)
        expect(returned_user.username).toEqual('new_user')
    })

    test('creating a user with no username', async () => {
        const response = await api.post('/api/users').send(new_user)
        expect(401)
    })

    test('creating a user with a repeate username', async () =>{
        const response = await api.post('/api/users').send(repeate_user_name)
    })


})

afterAll(() => {
    mongoose.connection.close()
})