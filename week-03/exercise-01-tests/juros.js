function calcJuros(capital, juros, tempo) {
  const jurosDecimal = juros / 100
  return parseFloat(capital) * parseFloat(jurosDecimal) * tempo
}

module.exports = {
  calcJuros
}
