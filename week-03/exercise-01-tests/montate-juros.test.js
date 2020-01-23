const {
  pure: { calcMontanteJurosSimples }
} = require('./montante-juros')

describe('Montate juros', () => {
  test('calcMontateJurosSimples', () => {
    const jurosSimples = () => 500
    const resJuros = calcMontanteJurosSimples({ jurosSimples })(100, 5, 1)
    expect(resJuros).toBe(600)
  })
})
