const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./models/User')

const JWT_SECRET = 'My little secret '
const saltRounds = 10

const MONGODB_URI = 'mongodb+srv://forest_schwartz:Bosquetr33s@cluster0.64ak0.mongodb.net/library-backend?retryWrites=true&w=majority'


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })





const typeDefs = gql`
type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
type Author {
    name: String!
    born: Int
    bookCount: Int
}
type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
}
  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]
      allAuthors: [Author]
      me: User
  }
  type Mutation{
    addBook (
    title:String!,
    author: String!,
    published: Int!,
    genres: [String]
  ): Book
  createUser(
    username: String!
    password: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  editAuthor(name: String, setBornTo: Int): Author
}
`

const resolvers = {
    Query: {
        bookCount: async () => {
            let num_of_books = await Book.count()
            return num_of_books
        },
        authorCount: async () => await Author.count(),
        allBooks: async (root, args) => {
            if (args.author && args.genre) {
                console.log('inside finding author by 2 parameters')
                const author = await Author.find({ name: args.author })
                return await Book.find({ author: author, genres: { $in: [args.genre] } })
            } else if (args.author) {
                console.log(args.author)
                const author = await Author.find({ name: args.author })
                return await Book.find({ author: author })
            } else if (args.genre) {
                return await Book.find({ genres: { $in: [args.genre] } })
            } else {
                return await Book.find({})
            }
        },
        allAuthors: async () => await Author.find({})
    },
    Mutation: {
        createUser: async(root, args) => {
            console.log(args.password)
            console.log(saltRounds)
            const passwordHash = await bcrypt.hash(args.password, saltRounds)
            const new_user = new User({username: args.username, passwordHash: passwordHash, favoriteGenre: args.favoriteGenre})
            try{
                const saved_user = await new_user.save()
                return saved_user
            }catch(error){
                throw new UserInputError(error.message)
            }
            
        },
        login: async(root, args) => {
            const {username, password} = args
            const user = await User.findOne({username})
            const passwordCorrect = user === null ? false: await bcrypt.compare(password, user.passwordHash)
            if(!(user && passwordCorrect)){
                throw new AuthenticationError('Username or Password is incorrect')
            }

            const userForToken = {
                id: user._id,
                username: user.username,
                favoriteGenre: user.favoriteGenre
            }

            const token = jwt.sign(userForToken, JWT_SECRET)
            return token
        },
        addBook: async (root, args) => {

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                author = new Author({ name: args.author })
                try {
                    await author.save()
                } catch (error) {
                    throw new UserInputError(error.message)

                }

            }
            const new_book = new Book({ title: args.title, published: args.published, author: author._id, genres: args.genres })

            try {
                await new_book.save()
            } catch (error) {
                throw new UserInputError(error.message)
            }

            return new_book
        },
        editAuthor: async (root, args) => {
            const original_author = await Author.findOne({ name: args.name })
            const updated_author = original_author.overwrite({ name: args.name, born: args.setBornTo })
            await updated_author.save()
            return updated_author

        }
    },
    Author: {
        bookCount: (root) => {
            let num_of_books = 0
            books.forEach((book) => {
                console.log(book)
                if (book.author === root.name) {
                    num_of_books += 1
                }

            })
            return num_of_books
        }

    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})