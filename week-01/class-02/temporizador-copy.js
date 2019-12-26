console.log("BEGIN")

setTimeout(() => {
  console.log("After two seconds")
}, 2000)

let count = 0
let interval = setInterval(() => {
  console.log("Hello!")
  count++

  if (count > 5) clearInterval(interval)
})

console.log("END")
