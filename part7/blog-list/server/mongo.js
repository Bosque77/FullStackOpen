const helper = require('./utils/db.helper')
const Blog = require('./models/blog')
const User = require('./models/user')
const mongoose = require('mongoose')


const url =
  'mongodb+srv://forest_schwartz:Bosquetr33s@cluster0.64ak0.mongodb.net/blog-app?retryWrites=true&w=majority'

mongoose.connect(url)

const initDB = async() => {
    let initial_users = await helper.users
    console.log(initial_users)
    await User.deleteMany({})
  
    const userObjects = initial_users.map(user => new User(user))
    let promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)

  
    await Blog.deleteMany({})
 
    let blogs = helper.blogs
    let blogObjects = blogs.map(blog => new Blog(blog))
    promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    mongoose.connection.close()
}


initDB()





