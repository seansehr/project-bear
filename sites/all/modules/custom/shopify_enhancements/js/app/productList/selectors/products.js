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
        func: filter.func,
        values: [filter.value]
      }
    }
  })

  let filterReturns = []
  for (let filterKey in filtersObj) {
    if (typeof filtersObj[filterKey].func === 'function') {
      filterReturns.push(filtersObj[filterKey].func(product, filtersObj[filterKey], excludeKeys))
    }
    else {
      filterReturns.push(excludeKeys.indexOf(filterKey) !== -1 || filtersObj[filterKey].values.indexOf(product[filterKey]) !== -1)
    }
  }

  return (filterReturns.length == filterReturns.filter(v => { return v }).length)
}

export const getVisibleProducts = (products, filters) => {
  return products.filter(product => productIsVisible(product, filters))
};
