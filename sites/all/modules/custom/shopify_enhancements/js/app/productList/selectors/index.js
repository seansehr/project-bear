import { createSelector } from 'reselect'
import { objectMap } from '../../helpers/object'
import { productIsVisible } from '../../helpers/products'

const getActiveCategory = (state) => state.activeCategory
const getProducts = (state) => state.products
const getFilters = (state) => state.filters
const getcategories = (state) => state.categories

export const getFilterOptions = createSelector(
  [ getActiveCategory, getProducts, getFilters, getcategories ],
  (activeCategory, products, filters, categories) => {
    let options = {}
    if (activeCategory) {
      products.forEach(function (product) {
        let option = product[activeCategory];
        if (option) {
          if (productIsVisible(product, filters, [activeCategory])) {
            let subfilter = 'NONE'
            if (categories[activeCategory].subfilter) {
              subfilter = product[categories[activeCategory].subfilter]
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
