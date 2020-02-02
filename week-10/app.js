const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const User = require("./models/user")

const app = express()
mongoose.Promise = global.Promise

const port = process.env.PORT || 3333
const mongo =
  process.env.MONGO ||
  "mongodb+srv://niltonslf:mongo123@cluster0-hakdt.mongodb.net/series?retryWrites=true&w=majority"

const series = require("./routes/series")

app.use(bodyParser.json())
app.use("/series", series)

app.post("/auth", async (req, res) => {
  const { username, password } = req.body

  const userDb = await User.findOne({ username })

  if (userDb) {
    if (userDb.password == password) {
      res.send("ok")
    } else {
      res.send("wrong credentials")
    }
  } else {
    res.send("wrong credentials")
  }
})

const createInitialUsers = async () => {
  const total = await User.count({})
  if (total == 0) {
    const user = new User({
      username: "niltonslf",
      password: 123456,
      roles: ["restrito", "admin"]
    })
    await user.save()

    const user2 = await new User({
      username: "guest",
      password: 123456,
      roles: ["restrito"]
    })

    await user2.save()
  }
}

mongoose.connect(mongo, { useNewUrlParser: true }).then(() => {
  createInitialUsers()
  app.listen(port, () => {
    console.log(`Server was started on http://localhost:${port}`)
  })
})
