const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const db = mongoose.connection
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const Record = require('./models/Record')
const Category = require('./models/Category')
const routes = require('./routes')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(routes)

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',() => {
  console.log('mongodb connected!')
})


app.listen(3000,() => {
  console.log('App is running on http://localhost:3000')
})
