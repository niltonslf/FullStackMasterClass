/**
 * 1) Dado um vetor de números, como poderia ser realizada a soma de todos os valores utilizando reduce.
 */

const numbersVector = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const sum = numbersVector.reduce((prev, cur) => {
  return prev + cur
}, 0)

console.log({ sum })

/**
 * 2) Dado um vetor de números, como poderia ser realizada a soma de todos os valores pares utilizando reduce e filter.
 */

const numbersVector2 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const sum2 = numbersVector
  .filter(num => {
    if (num % 2 == 0) return num
  })
  .reduce((prev, cur) => {
    return prev + cur
  }, 0)

console.log({ sum2 })

/**
 * 3) Dado um vetor de números, como poderia ser realizada a soma de todos os valores ímpares utilizando reduce e filter.
 */

const numbersVector3 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const sum3 = numbersVector
  .filter(num => {
    if (num % 2 == 1) return num
  })
  .reduce((prev, cur) => {
    return prev + cur
  }, 0)

console.log({ sum3 })

/**
 * 5) Dado um vetor de valores, retorne um objeto com quantas vezes cada valor está presente no vetor (dica: utilize reduce)
 */

const numbersVector4 = ["casa", "casa", "trabalho"]
var count = numbersVector4.reduce((prev, cur) => {
  if (!prev.hasOwnProperty(cur)) prev[cur] = 0
  prev[cur]++

  return prev
}, {})

console.log(count)

/**
 * 6) Dado um vetor de valores, retorne um vetor com somente os valores únicos do vetor (aqueles que ocorrem apenas 1 vez dentro do vetor) (Dica 1: utilize reduce, filter e keys, Dica 2: escreva console.log(objeto.keys()) e veja como ele poderá te ajudar neste exercício)
 */

const vetor6 = [1, 2, 2, 3, 4, 4, 5, 6, "nilton", "nilton", "Javascript"]
const howManyTimes = (prev, cur) => {
  if (!prev[cur])
    prev[cur] = {
      value: cur,
      occur: 0
    }
  prev[cur].occur++

  return prev
}

const contagem = vetor6.reduce(howManyTimes, {})
const keys = Object.keys(contagem)
const unique = keys.filter(key => contagem[key].occur === 1)
const univeValues = unique.map(val => contagem[val].value)

console.table(univeValues)

/**
 * 6) Dado um vetor com números, retorne somente os números pares;
 */
const numbersVector6 = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const even = numbersVector6.filter(number => {
  if (number % 2 == 0) return number
})
// console.log({ even })

/**
 * 7) Dado um vetor com números, retorne somente os números ímpares;
 */

const numbersVector7 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const odd = numbersVector7.filter(number => {
  if (number % 2 == 1) return number
})

// console.log({ odd })

/**
 * 8) Uma função é chamada da seguinte forma: calculadora(10, '+', 20) crie o corpo da função de forma que ela realize as 4 operações aritméticas.
 */

function calculadora(num1, op, num2) {
  const ops = {
    "+": (num1, num2) => num1 + num2,
    "-": (num1, num2) => num1 - num2,
    "*": (num1, num2) => num1 * num2,
    "/": (num1, num2) => num1 / num2
  }

  if (!ops.hasOwnProperty(op)) return "Operação não encontrada"

  return ops[op](num1, num2)
}

console.log(calculadora(1024, "*", 10))

/**
 * 9) Modifique a calculadora do exercício anterior para que ela receba 2 números e uma função, e realize o cálculo. Exemplo:
 * const soma = (num1, num2) => num1+num2
 * const calculadoraFn = (....) => ….
 * calculadoraFn(10, soma, 20)
 */

function calculadoraFn(num1, fun, num2) {
  return fun(num1, num2)
}

const soma = (num1, num2) => num1 + num2
const sub = (num1, num2) => num1 - num2
const mul = (num1, num2) => num1 * num2
const div = (num1, num2) => num1 / num2

console.log(calculadoraFn(1024, mul, 10))
