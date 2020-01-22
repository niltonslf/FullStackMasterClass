const express = require('express')
const path = require('path')
const app = express()

const routes = require('./routes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(routes)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}`)
})
