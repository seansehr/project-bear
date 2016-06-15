export const productIsVisible = (product, filters, excludeKeys = []) => {
  if (!filters.length) {
    return true
  }

  // Group the filters with the same key together.
  let filtersObj = {}

  filters.forEach(filter => {
    if (filtersObj[filter.key]) {
      filtersObj[filter.key].values.push(filter.value)
    }
    else {
      filtersObj[filter.key] = {
        values: [filter.value]
      }
    }
  })

  let filterReturns = []
  for (let filterKey in filtersObj) {
    filterReturns.push(excludeKeys.indexOf(filterKey) !== -1 || filtersObj[filterKey].values.indexOf(product[filterKey]) !== -1)
  }

  return (filterReturns.length == filterReturns.filter(v => { return v }).length)
}

export const getVisibleProducts = (products, filter) => {
  let filteredProducts = products.filter(product => {
    return productIsVisible(product, filter)
  });
  return filteredProducts;
};
