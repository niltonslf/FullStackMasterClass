require("dotenv").config({})

const express = require("express")
const PORT = process.env.PORT || 3333
const app = express()
const fs = require("fs")
const path = require("path")

const s3 = require("s3")
const multer = require("multer")
const uploader = multer({ dest: "uploads" })

const Sequelize = require("sequelize")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const s3Config = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
  bucket: "fullstack-master-nslf",
}

const sequelize = new Sequelize("arquivos", "admin", "admin", {
  host: "localhost",
  dialect: "mysql",
})

const Arquivo = sequelize.define("arquivo", {
  name: {
    type: Sequelize.STRING,
    field: "name",
  },
})

const options = {
  s3Options: s3Config,
}

const s3Client = s3.createClient(options)
const aws = require("aws-sdk")
aws.config = new aws.Config(s3Config)
const s3SDK = new aws.S3()

const uploadToS3 = (file, key, mimetype, s3Config) => {
  const fileParams = {
    localFile: file,
    s3Params: {
      Bucket: s3Config.bucket,
      Key: key,
      ContentType: mimetype,
      // ACL: "public-read",
    },
  }

  return new Promise((resolve, reject) => {
    const uploader = s3Client.uploadFile(fileParams)
    uploader.on("end", () =>
      resolve({ message: "Arquivo enviado com sucesso", body: file })
    )
    uploader.on("error", (error) =>
      reject({
        message: "erro ao enviar arquivo",
        error,
      })
    )
  })
}

const removeFile = (file) => {
  return new Promise((resolve, reject) => {
    fs.unlink(file, (err) => {
      if (err) reject()
      else resolve()
    })
  })
}

app.get("/", async (req, res) => {
  const arquivos = await Arquivo.findAll()

  res.render("index", { arquivos })
})

app.get("/ver/:id", async (req, res) => {
  const arquivo = await Arquivo.findByPk(req.params.id)

  const s3File = {
    Bucket: s3Config.bucket,
    Key: arquivo.name,
    Expires: 10,
  }
  signedUrl = s3SDK.getSignedUrl("getObject", s3File)

  res.redirect(signedUrl)
})

app.post("/upload", uploader.single("file"), async (req, res) => {
  try {
    const { path, originalname, mimetype } = req.file
    await uploadToS3(path, originalname, mimetype, s3Config)
    await removeFile(path)
    await Arquivo.create({ name: originalname })

    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
})

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("listening..."))
})
