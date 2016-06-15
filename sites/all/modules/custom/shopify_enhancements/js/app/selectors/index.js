import { createSelector } from 'reselect'
import { objectMap } from '../helpers/object'
import { productIsVisible } from '../helpers/products'

const getSelectedFilter = (state) => state.selectedFilter
const getProducts = (state) => state.products
const getFilters = (state) => state.filters
const getFilterCategories = (state) => state.filterCategories

export const getFilterOptions = createSelector(
  [ getSelectedFilter, getProducts, getFilters, getFilterCategories ],
  (selectedFilter, products, filters, filterCategories) => {
    console.log(selectedFilter)
    let options = {}
    if (selectedFilter) {
      products.forEach(function (product) {
        let option = product[selectedFilter];
        if (option) {
          if (productIsVisible(product, filters, [selectedFilter])) {
            let subfilter = 'NONE'
            if (filterCategories[selectedFilter].subfilter) {
              subfilter = product[filterCategories[selectedFilter].subfilter]
            }
            if (typeof options[subfilter] === 'undefined') {
              options[subfilter] = {}
            }
            if (options[subfilter][option]) {
              options[subfilter][option].count = options[subfilter][option].count + 1;
            }
            else {
              options[subfilter][option] = {
                count: 1
              }
            }
          }
        }
      });
    }
    for (let option in options) {
      options[option] = objectMap(options[option], key => {
        return {
          key,
          count: options[option][key].count
        }
      }).sort((a, b) => {
        if (a.count == 0) {
          return 1
        }
        if (a.key < b.key) {
          return -1
        }
        if (a.key > b.key) {
          return 1
        }
        return 0
      })
    }

    let ret = objectMap(options, key => {
      return {
        key,
        values: options[key]
      }
    }).sort((a, b) => {
      if (a.key < b.key) {
        return -1
      }
      if (a.key > b.key) {
        return 1
      }
      return 0
    })

    return ret;
  }
)
