/**
 * Recebe capital, juiros, tempo e calcula o montante que resultante dessa operação
 * @param {*} capital inteiro ou float com a quantidade do capital
 * @param {*} juros em porcentagem. Ex: para 50% fornecer 50
 * @param {*} tempo quantidade de tempo que o calculo deve ser realizado
 */
const montanteJurosCompostos = ({ extrairJuros }) => (
  capital,
  juros,
  tempo
) => {
  const jurosDecimal = juros / 100
  const montante = capital * (1 + jurosDecimal) ** tempo
  return {
    montante,
    juros: extrairJuros(capital, montante)
  }
}

const extrairJuros = (capital, montante) => {
  return montante - capital
}

module.exports = {
  montanteJurosCompostos: montanteJurosCompostos({ extrairJuros }),
  pure: {
    montanteJurosCompostos
  }
}
