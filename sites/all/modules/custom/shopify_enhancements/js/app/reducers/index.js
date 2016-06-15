import { combineReducers } from 'redux'
import filterCategories from './filterCategories'
import products from './products'
import filters from './filters'
import sort from './sort'

function selectedFilter(state, action) {
  state = state || false;
  switch (action.type) {
    case 'LOAD_FILTER_OPTIONS':
      return action.selectedFilter;
    default:
      return state;
  }
}

function sortOpen(state, action) {
  state = state || 'closed';
  switch (action.type) {
    case 'TOGGLE_SORT':
      if (state == 'closed') {
        return 'opened'
      }
      else {
        return 'closed'
      }
    default:
      return state;
  }
}

const currency = (state = {key: 'USD', symbol: '$'}, action) => {
  switch (action.type) {
    case 'CURRENCY_CHANGE':
      return {
        key: action.key,
        symbol: action.symbol
      }
    default:
      return state;
  }
}

const ProductReducers = combineReducers({
  currency,
  products,
  filterCategories,
  selectedFilter,
  filters,
  sort,
  sortOpen
})

export default ProductReducers
