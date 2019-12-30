/*
2) A função readdir disponível no módulo fs do Node, permite ler um 
diretório, e retornar seu conteúdo como um vetor. Crie uma versão em
Promise da função.

Dica: a assinatura da função é: fs.readdir(caminho, (err, files) => {})
*/

const fs = require("fs")

const readdir = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      if (err) reject(err)
      resolve(files)
    })
  })
}

console.log("begin")

readdir("../").then(files => console.log(files))

console.log("end")
