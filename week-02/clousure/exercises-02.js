var a = 1

function someFunction(number) {
  function otherFunction(input) {
    return a
  }

  a = 5

  return otherFunction
}

var firstResult = someFunction(9)
var result = firstResult(2)

console.log(result)

/*
RESPOSTA:

result tem resultado 5

*/
