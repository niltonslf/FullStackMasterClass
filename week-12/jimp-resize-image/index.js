const Jimp = require('jimp')

Jimp.read('./image/woody.jpg', (err, image) => {
  image
  .cover(100,100)
  .blur(2)
  .write('woody-100x100-cover.jpg')
})