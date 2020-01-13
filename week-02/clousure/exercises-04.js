var a = 1

function b() {
  console.log(a)
  a = 10
  console.log(a)
  return
  function a() {}
}

b()

console.log(a)

/**

o resulto de a é: 1.
Imaginei que fosse 10 por ter chamado a função b() e dentro dela ter uma atribuição de 10 à variável a, mas aparentemente o valor de a fica preso do contexto da função b()
 
*/
