const fs = require("fs")
const sysPath = require("path")

const readdir = path =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })

const isDirectory = path =>
  new Promise((resolve, reject) => {
    fs.stat(path, (err, stat) => {
      if (err) reject(err)
      resolve(stat.isDirectory())
    })
  })

const readSubDirectories = async () => {
  // const folders = []
  const files = await readdir("./")

  const possibleFolders = await Promise.all(
    files.map(async file => {
      const stat = await isDirectory(file)
      if (stat) return file
      return false
    })
  )
  const folders = possibleFolders.filter(folder => !!folder)

  console.log(folders)
}

readSubDirectories()
