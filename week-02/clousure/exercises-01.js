function test() {
  console.log(a)
  console.log(foo())

  var a = 1
  function foo() {
    return 2
  }
}

test()

/**
 RESPOSTA:
  é retornado undefined para o primeiro clg e 2 para o segundo clg.
  Em ambos os clg é feito o processo chamado hoisting, ou seja, o motor do Javascript
  "leva ao topo" as declarações da variável a e da função foo(), porém no caso da variável a é só feita a declaração da mesma e por isso ela ainda não tem nenhum valor definido (undefined). Já para a função foo() é retornado o valor 2 sem nenhum problema.
 */
