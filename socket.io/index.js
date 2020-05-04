const PORT = process.env.PORT || 3333
const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
const path = require("path")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

io.on("connection", (socket) => {
  console.log("⚠️ Novo cliente conectado!")

  socket.emit("msg", { body: "Olá cliente!" })
  setInterval(() => socket.emit("msg", { body: "interval..." }), 2000)

  socket.on("msg", (msg) => console.log("Mensagem:", msg))
})

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "pages"))

app.get("/", (req, res) => {
  res.render("home")
})

http.listen(PORT, () =>
  console.log(`Server was started on http://localhost:${PORT}`)
)
