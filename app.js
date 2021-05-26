const express = require('express')
const app = express()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const db = mongoose.connection
const bodyParser = require('body-parser')
const methodOverride = require('method-override') 
const Record = require('./models/Record')
const Category = require('./models/Category')

mongoose.connect('mongodb://localhost/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true })

app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',() => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  let totalAmount = 0
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        totalAmount += record.amount
        Category.find()
          .then(categories => {
            categories.forEach(category => {
            if (record.category === category.name){
              record.icon = category.icon
            }
          })
        })
      })
      res.render('index', { records,totalAmount })
    })
    .catch(error => console.error(error))
})

app.post('/', (req, res) => {
  let totalAmount = 0
  filterCategory = req.body.filterCategory
  let filterList = []
  Record.find()
    .lean()
    .then(records => {
      records.forEach(record => {
        if (record.category === filterCategory){
          filterList.push(record)
          totalAmount += record.amount
          Category.find()
            .then(categories => {
              categories.forEach(category => {
              if (record.category === category.name){
                record.icon = category.icon
              }
            })
          })
        } else if (filterCategory === '全部支出') {
          filterList.push(record)
          totalAmount += record.amount
          Category.find()
            .then(categories => {
              categories.forEach(category => {
              if (record.category === category.name){
                record.icon = category.icon
              }
            })
          })
        }
      })
      res.render('index', { filterList,totalAmount })
    })
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

app.put('/expense-tracker/:id', (req, res) => {
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

app.delete('/expense-tracker/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000,() => {
  console.log('App is running on http://localhost:3000')
})
