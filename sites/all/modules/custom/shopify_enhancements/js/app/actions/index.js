export const clearAllFilters = () => {
  return {
    type: 'CLEAR_FILTERS'
  }
}

export const clearFilter = (key, value) => {
  return {
    type: 'CLEAR_FILTER',
    key,
    value
  }
}

export const loadFilterOptions = (selectedFilter) => {
  return {
    type: 'LOAD_FILTER_OPTIONS',
    selectedFilter: selectedFilter
  }
}

export const setFilter = (key, value) => {
  return {
    type: 'SET_FILTER',
    key,
    value
  }
}

export const setProducts = (products) => {
  return {
    type: 'SET_PRODUCTS',
    products
  }
}

export const setSort = (key, order) => {
  return {
    type: 'SET_SORT',
    key,
    order
  }
}

export const toggleSort = () => {
  return {
    type: 'TOGGLE_SORT'
  }
}

export const changePrice = (product, prices, currency) => {
  return {
    type: 'CURRENCY_CHANGE',
    product,
    prices,
    currency
  }
}

export const changeCurrency = (products, currency) => {
  return dispatch => {
    products.forEach((product, index) => {
      Drupal.behaviors.shopify_enhancements_currency.convertMultiple([product.price, product.compare_at_price], currency.key).then(prices => {
        dispatch(changePrice(product, prices, currency))
      })
    })
  }
}

window.changeCurrency = changeCurrency
