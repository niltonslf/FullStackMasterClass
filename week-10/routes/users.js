const { Router } = require("express")
const User = require("../models/user")

const jwt = require("jsonwebtoken")
const jwtSecret = "!@#$%"

const router = Router()

router.use(async (req, res, next) => {
  const token =
    req.headers["x-access-token"] || req.body.token || req.query.token

  if (token) {
    try {
      const payload = jwt.verify(token, jwtSecret)

      if (payload.roles.includes("admin")) {
        next()
      } else {
        res.send({
          success: false,
          message: "You dont have permission to access this page."
        })
      }
    } catch (e) {
      res.send({
        success: false,
        message: "unauthorized"
      })
    }
  }
  res.res({
    success: false,
    message: "unauthorized"
  })
})

router.get("/", async (req, res) => {
  const Users = await User.find({})

  res.send(Users)
})

module.exports = router
