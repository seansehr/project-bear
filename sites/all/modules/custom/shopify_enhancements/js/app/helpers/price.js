export const convert = function (price, to) {
  price = parseFloat(price);
  if (isNaN(price)) {
    console.error('Price is NaN.');
    return false;
  }
  return accounting.toFixed(fx.convert(price, {to: to}), 2)
}

export const format = function (price, currency, form = '%s %v') {
  let symbol = currency.key == 'CAD' ? '$' : currency.symbol
  return accounting.formatMoney(price, {
    symbol: symbol,
    format: form
  });
}

export const convertAndFormat = function (price, currency, form = '%s %v') {
  return format(convert(price, currency.key), currency, form)
}
