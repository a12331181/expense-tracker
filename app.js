const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open',() => {
  console.log('mongodb connected!')
})

app.get('/',(req,res) => {
  res.send('hello world')
})

app.listen(3000,() => {
  console.log('App is running on http://localhost:3000')
})
