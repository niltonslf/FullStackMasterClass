const { calcJuros } = require('./juros')

const calcMontanteJurosSimples = ({ jurosSimples }) => (
  capital,
  juros,
  tempo
) => {
  const jurosSimplesRes = jurosSimples(capital, juros, tempo)
  return capital + jurosSimplesRes
}

module.exports = {
  calcMontanteJurosSimples: calcMontanteJurosSimples({
    jurosSimples: calcJuros
  }),
  pure: {
    calcMontanteJurosSimples
  }
}
