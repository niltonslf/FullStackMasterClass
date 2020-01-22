const { calcJuros } = require('./juros')

describe('Calcular juros', () => {
  test('calcJuros', () => {
    const juros = calcJuros(1000, 50, 1)
    expect(juros).toBe(500)
  })
})
