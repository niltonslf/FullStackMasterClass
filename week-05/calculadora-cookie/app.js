const path = require('path')
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3333
const bodyParser = require('body-parser')

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  const { num1, num2, op } = req.body
  let total = 0

  if (op == '+') {
    total = num1 + num2
  } else if (op == '-') {
    total = num1 - num2
  } else if (op == '*') {
    total = num1 * num2
  } else if (op == '/') {
    total = num1 / num2
  } else {
    throw 'Operação não conhecida'
  }

  res.render('index')
})

app.post('/calc', (req, res) => {
  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})
