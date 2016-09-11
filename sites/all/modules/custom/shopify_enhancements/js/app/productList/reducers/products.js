const products = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      var ret = state.array(0);
      ret.products.push();
      return ret;
    case 'CURRENCY_CHANGE':
      return state.map(product => {
        if (product.id == action.product.id) {
          product.display_price = action.prices[0]
          product.display_compare_at_price = product.compare_at_price ? action.prices[1] : product.compare_at_price
        }
        return product
      })
    default:
      return state
  }
}

export default products
