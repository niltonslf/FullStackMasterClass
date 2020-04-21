require('dotenv').config({})

const s3 = require('s3');


const params = {
  filename: './teste-arquivo.txt',
  s3Params: {
    Bucket: 'fullstack-master',
    key: 'teste-arquivo.txt'
  },
  s3Options: {
    accessKeyId:  process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'us-east-1'
  }
}

const client = s3.createClient(params);
const uploader = client.uploadFile(params)
uploader.on('error', e => console.log(e))
uploader.on('progress', () => console.log('uploading...'))
uploader.on('end', () => console.log('finished'))