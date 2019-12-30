const fs = require("fs")
const sysPath = require("path")

const readdir = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      const folders = files.map(file => sysPath.join(__dirname, path, file))
      resolve(folders)
    })
  })
}

const readSubDirectories = async basePath => {
  const directories = await readdir(basePath)

  directories.map(directory => {
    fs.stat(path, (err, stats) => {
      if (err) throw err
      if (stats.isDirectory()) {
        readdir(directory)
      }
    })
  })
}

const isDirectory = path => {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      if (err) reject(err)
      resolve(stats.isDirectory())
    })
  })
}

readSubDirectories("../")
