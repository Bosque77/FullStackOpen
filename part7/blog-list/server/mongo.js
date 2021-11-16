const mongoose = require('mongoose')


const url =
  `mongodb+srv://forest_schwartz:Bosquetr33s@cluster0.64ak0.mongodb.net/blog-app?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog_1 = new Blog({
    "title": "The Big Bad Wolf",
    "author": "Forest Schwartz",
    "url": "www.bigbadworld.com",
    "likes": 23
})

blog_1.save().then(result => {
  console.log('note saved!')
}).catch(error => console.log(error))
.then(result =>{
    const blog_2 = new Blog({
        "title": "The Heckler",
        "author": "Ryan Smith",
        "url": "www.Heckle_My_Shmeckle.com",
        "likes": 15000
    })
    
    blog_2.save().then(result => {
      console.log('note saved!')
    }).catch(error => console.log(error))
    .then(
        Blog.find({}).then(result => {
            result.forEach(blog => {
              console.log(blog)
            })
            mongoose.connection.close()
          })
    )

}


)



