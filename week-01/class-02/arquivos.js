const fs = require("fs")

fs.readFile("temporizadores.js", (err, data) => {
  fs.writeFile("temporizador-copy.js", data, err => {
    console.log("arquivo copiado")
  })
})

const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })

const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })


const copyFile = async () => {
    console.log('olá async/await')
}


// readFile("temporizadores.js")
//   .then(data => writeFile(`temporizadores-${new Date().getTime()}.js`, data))
//   .catch(err => console.log(err))

