const bcrypt = require('bcrypt')
let salt_rounds = 10

const user_1_id = '4eb6e7e7e9b7f4194e000001'
const user_2_id = '6168f9a81d0b994510d8ec67'

const blog_1_id = '6197f1a09854fc946c078b73'
const blog_2_id = '6197f1a09854fc946c078b72'



const createUsers = async (users) => {
    let promise_array = users.map( async (user) => {
        let password = user.password
        let passwordHash = await bcrypt.hash(password, salt_rounds)
        let new_user = {...user,passwordHash}
        return new_user
    })
    let data = await Promise.all(promise_array)
    return data
}


let user_1 = {
    _id: user_1_id,
    username: 'forestschwrtz',
    name: 'Forest',
    password: 'test123',
    blogs: [blog_1_id]
}

let user_2 = {
    _id: user_2_id,
    username: 'jblow',
    name: 'John Barlow',
    password: 'test123',
    blogs: [blog_2_id]
}


let blog_1 = {
    _id: blog_1_id,
    title: 'Forests Hero',
    author: 'J wizel',
    url: 'www.jwizel.com',
    likes: 26,
    user: user_1_id,
    comments:[],

}

let blog_2 = {
    _id: blog_2_id,
    title: 'Be Great',
    author: 'Narco Stop',
    url: 'www.begreatordietrying.com',
    likes: 28,
    user: user_2_id,
    comments:[]
}





let blogs = [blog_1, blog_2]
let users = createUsers([user_1,user_2])

module.exports = { blogs, users }