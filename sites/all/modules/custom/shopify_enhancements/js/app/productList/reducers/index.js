import { combineReducers } from 'redux'
import currency from './currency'
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

const ProductReducers = combineReducers({
  currency,
  products,
  filterCategories,
  selectedFilter,
  filters,
  sort,
})

export default ProductReducers
