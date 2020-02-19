const express = require('express')
const compression = require('compression')


const app = express()
app.use(compression({level: 9}))

const largeObject = []

app.get('/', (req,res) => {
  for (let i = 0; i < 10000; i++) {
    largeObject.push({
      name:'Nilton',
      age: 23,
      key: i
    })
    
  }
  
  
  res.json(largeObject)
})

app.listen(3333, () => {
  console.log('listening');
})