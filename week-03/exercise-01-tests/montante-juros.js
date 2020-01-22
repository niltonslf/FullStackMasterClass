const { calcJuros } = require('./juros')

const calcMontanteJurosSimples = ({ jurosSimples }) => (
  capital,
  juros,
  tempo
) => {
  const jurosSimplesRes = jurosSimples(capital, juros, tempo)
  return capital + jurosSimplesRes
}

// DEBUG
const res = calcMontanteJurosSimples({ jurosSimples: calcJuros })(1000, 50, 1)
console.log(res)

module.exports = {
  calcMontanteJurosSimples: calcMontanteJurosSimples({
    jurosSimples: calcJuros
  }),
  pure: {
    calcMontanteJurosSimples
  }
}
