// Filters
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

export const setFilter = (key, value) => {
  return {
    type: 'SET_FILTER',
    key,
    value
  }
}

// Category
export const loadFilterOptions = (category) => {
  return {
    type: 'SET_CATEGORY',
    category
  }
}

// Sort
export const setSort = (key, order) => {
  return {
    type: 'SET_SORT',
    key,
    order
  }
}

export const toggleSortVisibility = () => {
  return {
    type: 'TOGGLE_SORT_VISIBILITY'
  }
}

// Currency
// Triggered from outside the app.
export const setCurrency = currency => {
  return {
    type: 'SET_CURRENCY',
    currency
  }
}
