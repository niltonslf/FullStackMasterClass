const express = require('express')
const { convert, toMoney } = require('./lib/convert')
const { getExchangeRate } = require('./lib/exchange-api')

const routes = express.Router()

routes.get('/', async (req, res) => {
  const exchangeRate = await getExchangeRate()
  console.log(exchangeRate)
  res.render('home', {
    exchangeRate
  })
})

routes.get('/exchangeRate', (req, res) => {
  const { price, amount } = req.query
  const conversion = convert(price, amount)

  if (!price && !amount) {
    res.render('exchangeRate', {
      error: 'Valores inválidos'
    })
  }

  res.render('exchangeRate', {
    error: false,
    price: toMoney(price),
    amount: toMoney(amount),
    conversion: toMoney(conversion)
  })
})

module.exports = routes
