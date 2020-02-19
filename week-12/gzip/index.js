const express = require('express')
const compression = require('compression')


const app = express()
app.use(compression())

const largeObject = []
for (let i = 0; i < 10000; i++) {
  largeObject.push({
    name:'Nilton',
    age: 23,
    key: i
  })
  
}

app.get('/', (req,res) => {
  res.header('Cache-Control', 'public, max-age=3600')
  res.json(largeObject)
})

app.listen(3333, () => {
  console.log('listening');
})