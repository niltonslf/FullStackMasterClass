/**
 * Realiza calculo de juros simples com base no juros em decimal e tempo
 * @param {*} capital
 * @param {*} juros
 * @param {*} tempo
 */
function jurosSimples(capital, juros, tempo) {
  const jurosDecimal = juros / 100
  return parseFloat(capital) * parseFloat(jurosDecimal) * tempo
}

/**
 *
 * @param {Object} dependecies
 */
const montanteSimples = ({ jurosSimples }) => {
  return (capital, juros, tempo) => {
    const jurosSimplesRes = jurosSimples(capital, juros, tempo)
    return capital + jurosSimplesRes
  }
}

/**
 * Recebe capital, juiros, tempo e calcula o montante que resultante dessa operação
 * @param {*} capital inteiro ou float com a quantidade do capital
 * @param {*} juros em porcentagem. Ex: para 50% fornecer 50
 * @param {*} tempo quantidade de tempo que o calculo deve ser realizado
 */
const montanteJurosCompostos = (capital, juros, tempo) => {
  const jurosDecimal = juros / 100
  const montante = capital * (1 + jurosDecimal) ** tempo

  return montante
}

/**
 * Retorna o valor de juros em cima de um montante
 * @param {*} capital Valor inicial sem o juros
 * @param {*} montante Valor final já com o juros aplicado
 */
const jurosCompostos = ({ montanteJurosCompostos }) => {
  return (capital, juros, tempo) =>
    montanteJurosCompostos(capital, juros, tempo) - capital
}

module.exports = {
  jurosSimples,
  montanteSimples: montanteSimples({ jurosSimples }),
  montanteJurosCompostos,
  jurosCompostos: jurosCompostos({ montanteJurosCompostos }),
  pure: {
    montanteSimples,
    jurosCompostos
  }
}
