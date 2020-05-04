require("dotenv").config({})
const path = require("path")
const express = require("express")
const PORT = process.env.PORT || 3333

const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)

const Twit = require("twit")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "pages"))

const T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
})

io.on("connection", (socket) => {
  console.log("⚠️ Novo cliente conectado!")
})

const stream = T.stream("statuses/filter", { track: "#covid" })
stream.on("tweet", (tweet) => {
  io.emit("tweet", {
    username: tweet.user.name,
    text: tweet.text,
  })
})

app.get("/", (req, res) => {
  res.render("home")
})

http.listen(PORT, () =>
  console.log(`Server was started on http://localhost:${PORT}`)
)
