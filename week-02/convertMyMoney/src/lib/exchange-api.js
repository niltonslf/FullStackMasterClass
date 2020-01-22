const axios = require('axios')
const apiUrl = 'http://economia.awesomeapi.com.br/USD-BRL/1?format=json'

const getExchangeRateAPI = url => axios.get(url)
const extractExchangeRate = res => res.data[0].high

const getExchangeRate = ({
  getExchangeRateAPI,
  extractExchangeRate
}) => async () => {
  try {
    const res = await getExchangeRateAPI(apiUrl)
    const exchangeRate = extractExchangeRate(res)
    return exchangeRate
  } catch (error) {
    return ''
  }
}

module.exports = {
  getExchangeRateAPI,
  extractExchangeRate,
  getExchangeRate: getExchangeRate({
    getExchangeRateAPI,
    extractExchangeRate
  }),
  pure: {
    getExchangeRate
  }
}
