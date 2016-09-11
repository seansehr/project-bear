export const format = function (price, currency, form = '%s %v') {
  let symbol = currency.key == 'CAD' ? '$' : currency.symbol
  return accounting.formatMoney(price, {
    symbol: symbol,
    format: form
  });
}
