const fs = require("fs")
const sysPath = require("path")

const readdir = path =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })

const isFile = path =>
  new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) reject(err)
      resolve(stat.isFile())
    })
  })

const readFiles = async () => {
  // const folders = []
  const files = await readdir("./")

  const possibleFiles = await Promise.all(
    files.map(async file => {
      const stat = await isFile(file)
      if (stat) return file
      return false
    })
  )
  const folders = possibleFiles.filter(folder => !!folder)

  console.log(folders)
}

readFiles()
