const Jimp = require("jimp")

const empresas = [
  { id: 1, nome: "Empresa A", telefone: "1234" },
  { id: 2, nome: "Empresa B", telefone: "12345" },
  { id: 3, nome: "Empresa C", telefone: "12346" },
  { id: 4, nome: "Empresa D", telefone: "12347" },
  { id: 5, nome: "Empresa E", telefone: "12348" }
]

const genImage = async text => {
  const image = await new Jimp(100, 15)
  const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)
  image.print(font, 0, 0, `${text}`)

  return image
  // await image.write("test.png")
}

genImage()

const express = require("express")
const app = express()

app.set("view engine", "ejs")
app.get("/", (req, res) => {
  res.render("index", { empresas })
})
app.get("/image/:key", async (req, res) => {
  const key = req.params.key
  const image = await genImage(empresas[key].telefone)
  image.getBuffer(Jimp.MIME_PNG, (err, data) => {
    res.header("Content-Type", "image/png")
    res.send(data)
  })
})

app.listen(3333, () => console.log("listening..."))
