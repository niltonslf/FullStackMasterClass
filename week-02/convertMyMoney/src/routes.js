const express = require("express")
const { convert, toMoney } = require("./lib/convert")

const routes = express.Router()

routes.get("/", (req, res) => {
  res.render("home")
})

routes.get("/exchangeRate", (req, res) => {
  const { price, amount } = req.query
  const conversion = convert(price, amount)

  if (!price && !amount) {
    res.render("exchangeRate", {
      error: "Valores inválidos"
    })
  }

  res.render("exchangeRate", {
    error: false,
    price: toMoney(price),
    amount: toMoney(amount),
    conversion: toMoney(conversion)
  })
})

module.exports = routes
