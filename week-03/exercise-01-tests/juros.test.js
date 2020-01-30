const {
  jurosSimples,
  extrairJuros,
  montanteJurosCompostos,
  pure
} = require('./juros')
const { montanteSimples, jurosCompostos } = pure

describe('Calcular juros', () => {
  test('JurosSimples', () => {
    const juros = jurosSimples(1000, 50, 1)
    expect(juros).toBe(500)
  })
  test('JurosSimples tempo = 0', () => {
    const juros = jurosSimples(1000, 50, 0)
    expect(juros).toBe(0)
  })
})

describe('Montate juros', () => {
  test('calcMontateJurosSimples', () => {
    const jurosSimples = jest.fn()
    jurosSimples.mockReturnValue(500)

    const resJuros = montanteSimples({ jurosSimples })(100, 5, 1)
    expect(resJuros).toBe(600)
  })
})

describe('Montate juros compostos', () => {
  test('montanteJurosCompostos', () => {
    const capital = 1000
    const juros = 50
    const tempo = 1

    const res = montanteJurosCompostos(capital, juros, tempo)

    expect(res).toStrictEqual(1500)
  })

  test('JurosCompostos ', () => {
    const capital = 1000
    const juros = 10
    const tempo = 1

    const montanteJurosCompostos = jest.fn()
    montanteJurosCompostos.mockImplementation(() => 1100)

    const jurosRes = jurosCompostos({
      montanteJurosCompostos
    })(capital, juros, tempo)

    expect(montanteJurosCompostos.mock.calls[0]).toEqual([
      capital,
      juros,
      tempo
    ])
    expect(jurosRes).toBe(100)
  })
})
