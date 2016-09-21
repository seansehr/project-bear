import { createSelector } from 'reselect'
import { getVisibleProducts } from './products'
import filterOptions from './filters'
import tagFilter from './tagFilter'

const getActiveCategory = (state) => state.activeCategory
const getProducts = (state) => state.products
const getFilters = (state) => state.filters
const getCategories = (state) => state.categories

export const getFilteredProducts = createSelector(
  getProducts, getFilters, getVisibleProducts
)

export const getTagFilters = createSelector(
  getProducts, getFilters, tagFilter
)

export const getFilterOptions = createSelector(
  getProducts, getFilters, getCategories, getActiveCategory, filterOptions
)
