const mongoose = require('mongoose')
const Record = require('../Record')
mongoose.connect('mongodb://localhost/Record', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
  Record.create({
      "name": "出去玩",
      "category": "休閒娛樂",
      "date": "2019-04-23",
      "amount": 200
    },
    {
      "name": "繳學費",
      "category": "家居物業",
      "date": "2019-03-23",
      "amount": 400
    },
    {
      "name": "搭高鐵",
      "category": "交通出行",
      "date": "2019-03-28",
      "amount": 1200
    },
    {
      "name": "吃大餐",
      "category": "餐飲食品",
      "date": "2019-03-29",
      "amount": 1000
    },
    {
      "name": "繳罰單",
      "category": "其他",
      "date": "2019-01-29",
      "amount": 600
    })
  }
)