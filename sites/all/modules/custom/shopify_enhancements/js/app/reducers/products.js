const products = (state = [], action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      var ret = state.array(0);
      ret.products.push();
      return ret;
    case 'CURRENCY_CHANGE':
      console.log(action)
      return state.map(product => {
        if (product.id == action.product.id) {
          product.display_price = action.price
        }
        return product
      })
    case 'SET_PRODUCTS':
      return action.products
    default:
      return state
  }
}

export default products
