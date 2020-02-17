const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const swaggerUi = require("swagger-ui-express")
const YAML = require("yamljs")
const swaggerDoc = YAML.load("./swagger.yaml")

const User = require("./models/user")
const jwtSecret = "!@#$%"

const series = require("./routes/series")
const users = require("./routes/users")

const app = express()

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc))
app.use(cors())
app.use(bodyParser.json())
app.use("/series", series)
app.use("/users", users)

app.post("/auth", async (req, res) => {
  const { username, password } = req.body

  const userDb = await User.findOne({ username })

  if (userDb) {
    if (userDb.password == password) {
      const payload = {
        id: userDb._id,
        username: userDb.username,
        roles: userDb.roles
      }
      jwt.sign(payload, jwtSecret, (err, token) => {
        res.send({
          success: true,
          token
        })
      })
    } else {
      res.send({
        success: false,
        message: "Wrong credentials"
      })
    }
  } else {
    res.send({
      success: false,
      message: "Wrong credentials"
    })
  }
})

module.exports = app
