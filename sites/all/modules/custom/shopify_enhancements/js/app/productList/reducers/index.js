import { combineReducers } from 'redux'
import activeCategory from './activeCategory'
import categories from './categories'
import currency from './currency'
import products from './products'
import filters from './filters'
import sort from './sort'

const ProductReducers = combineReducers({
  activeCategory,
  categories,
  currency,
  filters,
  products,
  activeCategory,
  sort
})

export default ProductReducers
