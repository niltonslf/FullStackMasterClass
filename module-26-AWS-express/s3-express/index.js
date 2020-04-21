require("dotenv").config({})

const express = require("express")
const PORT = process.env.PORT || 3333
const app = express()
const fs = require("fs")
const path = require("path")

const s3 = require("s3")
const multer = require("multer")
const { get } = require("http")
const uploader = multer({ dest: "uploads" })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const options = {
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
  },
}

const s3Client = s3.createClient(options)

app.get("/", (req, res) => res.render("index"))

app.post("/upload", uploader.single("file"), (req, res) => {
  const fileParams = {
    localFile: req.file.path,
    s3Params: {
      Bucket: "fullstack-master-nslf",
      Key: req.file.originalname,
    },
  }
  const uploader = s3Client.uploadFile(fileParams)

  uploader.on("end", () => {
    fs.unlinkSync(req.file.path)
    res.send("upload finalizado")
  })
  uploader.on("error", () => {
    console.log("erro ao enviar arquivo")
  })
})

app.listen(PORT, () => console.log("listening..."))
