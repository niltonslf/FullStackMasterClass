console.log("Olá!")

// sleep(2000, () => {
//   console.log("Depois de dois segundos")
// })

console.log("Final do arquivo")

sleep(2000).then(() => {
  console.log("Passaram 2 segundos")
})

// function sleep(time, callback) {
//   return new Promise((resolve, reject) =>
//     setTimeout(() => {
//       callback()
//       resolve()
//     }, time)
//   )
// }

function sleep(time) {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, time)
  )
}
