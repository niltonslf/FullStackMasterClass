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
  res.render('index', {
    contas: req.cookies.contas
  })
})

app.post('/calc', (req, res) => {
  let { num1, num2, op } = req.body
  num1 = parseInt(num1)
  num2 = parseInt(num2)

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

  let contas = []
  if ('contas' in req.cookies) {
    contas = req.cookies.contas
  }

  contas.push({ num1, num2, op, total })

  res.cookie('contas', contas)

  res.redirect('/')
})

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})
