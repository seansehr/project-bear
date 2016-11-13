export const format = function (price, currency, form = '%s %v') {
  return accounting.formatMoney(price, {
    symbol: currency.symbol,
    format: form
  }) + ' ' + currency.key;
}
