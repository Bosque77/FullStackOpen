const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request,response) => {
    console.log('inside get users')
    const Users = await User.find({}).populate('blogs')
    response.json(Users.map(User => User.toJSON()))
})

usersRouter.get('/:id', async (request,response) => {
    const the_user = await User.findById(request.params.id)
    if (the_user) {
        response.json(the_user.toJSON())
    } else {
        response.status(404).end()
    }
})

usersRouter.post('/', async (request,response) => {
    let user_data = request.body
    let username = user_data.username
    let name = user_data.name
    let password = user_data.password

    if(!(username && name && password)){
        return response.status(401).json({
            error: 'make sure you entered a username, name, and password'
        })
    }else if(password.length<3 || username.length<3){
        return response.status(401).json({
            error: 'password and username must be greater than 3 characters'
        })
    }
    else{
        let salt_rounds = 10
        let passwordHash = await bcrypt.hash(password, salt_rounds)

        const user = new User({
            username,
            name,
            passwordHash,
        })
        const savedUser = await user.save()

        response.json(savedUser)
    }

})


module.exports = usersRouter