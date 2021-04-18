const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const db = mongoose.connection
const bodyParser = require('body-parser')
const Record = require('./models/Record')
const Category = require('./models/Category')

mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',() => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Record.find()
    .lean()
    .then(records => res.render('index', { records })) 
    .catch(error => console.error(error)) 
})

app.get('/expense-tracker/new', (req, res) => {
  res.render('new')
})

app.get('/expense-tracker/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

app.post('/expense-tracker', (req, res) => {
  const name = req.body.name
  const date = req.body.date
  const category = req.body.category
  const amount = req.body.amount    
  return Record.create({ name,date,category,amount })   
    .then(() => res.redirect('/')) 
    .catch(error => console.log(error))
})

app.post('/expense-tracker/:id/edit', (req, res) => {
  const id = req.params.id
  const name = req.body.name
  const date = req.body.date
  const category = req.body.category
  const amount = req.body.amount 
  return Record.findById(id)
  .then(record =>{
    record.name = name
    record.date = date
    record.category = category
    record.amount = amount
    return record.save()
  })
  .then(()=> res.redirect('/'))
  .catch(error => console.log(error))
})

app.listen(3000,() => {
  console.log('App is running on http://localhost:3000')
})
