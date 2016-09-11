const currency = (state = {key: 'USD', symbol: '$', converter: price => price}, action) => {
  switch (action.type) {
    case 'SET_CURRENCY':
      return action.currency
    default:
      return state;
  }
}

export default currency
