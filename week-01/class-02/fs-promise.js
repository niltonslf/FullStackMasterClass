const fs = require("fs")

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
  console.log("olá async/await")
  try {
    const data = await readFile("temporizadores.js")
    await writeFile(`temporizadores-${new Date().getTime()}.js`, data)
    console.log("arquivo lido e escrito")
  } catch (error) {
    console.log("Erro", error)
  }
}

module.exports = {
  readFile,
  writeFile
}
