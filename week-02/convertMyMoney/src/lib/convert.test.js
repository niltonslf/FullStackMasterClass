const convert = require('./convert')

test('Convert price 4 and amount 4', () => {
  expect(convert.convert(4, 4)).toBe(16)
})

test('Convert price 0 and amount 4', () => {
  expect(convert.convert(0, 4)).toBe(0)
})

test('Convert to money', () => {
  expect(convert.toMoney(convert.convert(5, 4))).toBe('20.00')
})

test('Convert string to money', () => {
  expect(convert.toMoney('20')).toBe('20.00')
})
