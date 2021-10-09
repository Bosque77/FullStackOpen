const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]



const url =
  `mongodb+srv://forest_schwartz:${password}@cluster0.64ak0.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
})

const Person = mongoose.model('Person', personSchema)


if (name && number) {

  const person = new Person({
    name: name,
    number: number,
    date: new Date(),
  })

  person.save().then(() => {
    console.log('person saved')
    mongoose.connection.close()
  })

} else {
  Person.find({}).then(result => {
    result.forEach(person => {
      let entry = `${person.name} ${person.number}`
      console.log(entry)
    })
    mongoose.connection.close()
  })
}

