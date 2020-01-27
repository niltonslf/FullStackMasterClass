const { pure, extrairJuros } = require('./montante-juros-compostos')
const { montanteJurosCompostos } = pure

describe('Montate juros compostos', () => {
  const dataMock = {
    montante: 1500,
    juros: 500
  }

  test('ExtratirJuros ', () => {
    const juros = extrairJuros(1000, 1500)
    expect(juros).toBe(500)
  })

  test('montanteJurosCompostos', () => {
    const extrairJuros = jest.fn()
    extrairJuros.mockReturnValue(500)

    const res = montanteJurosCompostos({ extrairJuros })(1000, 50, 1)
    expect(res).toStrictEqual(dataMock)
  })
})
