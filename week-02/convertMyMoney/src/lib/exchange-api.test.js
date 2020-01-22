const {
  getExchangeRateAPI,
  extractExchangeRate,
  pure: { getExchangeRate }
} = require('./exchange-api')
const axios = require('axios')

jest.mock('axios')

test('getExchangeRateAPI ', () => {
  const res = {
    data: [
      {
        high: 1.59
      }
    ]
  }

  axios.get.mockResolvedValue(res)

  getExchangeRateAPI('url').then(response => {
    expect(response).toEqual(res)
    expect(axios.get.mock.calls[0][0]).toBe('url')
  })
})

test('extractExchangeRate', () => {
  const exchangeRate = extractExchangeRate({
    data: [
      {
        high: 1.59
      }
    ]
  })

  expect(exchangeRate).toBe(1.59)
})

describe('getExchangeRate', () => {
  test('getExchangeRate OK', async () => {
    const data = {
      data: [
        {
          high: 1.59
        }
      ]
    }

    const getExchangeRateAPI = jest.fn()
    getExchangeRateAPI.mockResolvedValue(data)

    const extractExchangeRate = jest.fn()
    extractExchangeRate.mockReturnValue(1.59)

    const res = await getExchangeRate({
      getExchangeRateAPI,
      extractExchangeRate
    })()

    expect(res).toBe(1.59)
  })

  test('getExchangeRate Err', async () => {
    const data = {}

    const getExchangeRateAPI = jest.fn()
    getExchangeRateAPI.mockReturnValue(Promise.reject('err'))

    const extractExchangeRate = jest.fn()
    extractExchangeRate.mockReturnValue(1.59)

    const res = await getExchangeRate({
      getExchangeRateAPI,
      extractExchangeRate
    })()

    expect(res).toBe('')
  })
})
