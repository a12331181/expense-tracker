const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',() => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/expense-tracker/new', (req, res) => {
  res.render('new')
})


app.listen(3000,() => {
  console.log('App is running on http://localhost:3000')
})
