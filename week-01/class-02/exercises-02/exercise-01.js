console.log("Olá!")

sleep(2000, () => {
  console.log("Depois de dois segundos")
})

console.log("Final do arquivo")

function sleep(time, callback) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      callback()
      resolve()
    }, time)
  )
}
