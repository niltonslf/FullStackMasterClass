require("dotenv").config({})
const s3 = require("s3")

const params = {
  localFile: `${__dirname}/teste-arquivo.txt`,
  s3Params: {
    Bucket: "fullstack-master-nslf",
    Key: "teste-arquivo.txt",
  },
}

const client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_DEFAULT_REGION,
  },
})
const uploader = client.uploadFile(params)
uploader.on("error", (e) => console.log(e))
uploader.on("progress", () => console.log("uploading..."))
uploader.on("end", () => console.log("finished"))
