const Blog = require('../models/blog')

const first_id = "4eb6e7e7e9b7f4194e000001"
const second_id = "6168f9a81d0b994510d8ec67"

const initialBlogs = [
  {
    title: "Forests Hero",
    author: "J wizel",
    url: "www.jwizel.com",
    likes: 26,
    _id : first_id
  },
  {
    title: "Be Great",
    author: "Narco Stop",
    url: "www.begreatordietrying.com",
    likes: 1000,
    _id : second_id
  }
]

const updated_blog = {
  title: "Be Great",
  author: "Narco Stop",
  url: "www.begreatordietrying.com",
  likes: 56,
  _id : second_id
}

const new_blog = {
  title: "New Blog ",
  author: "Blog Boy",
  url: "www.bebloggingallday.com",
  likes: 265
}

const blog_w_no_likes = {
  title: "Blog w no Likes",
  author: "Beatle Bets",
  url: "www.naruto.com"
}

const illformed_blog_1 = {
  title: "",
  author: "Beatle Bets",
  url: "www.naruto.com"
}

const illformed_blog_2 = {
  title: "Major Lazer",
  author: "Beatle Bets",
}


let user = {
  username: 'forestschwrtz',
  name: 'Bosque77',
  password: 'Forest',
}

module.exports = {
  initialBlogs, new_blog, blog_w_no_likes, illformed_blog_1, illformed_blog_2,first_id,second_id, updated_blog, user
}