import { fieldValue } from '../../helpers/fields'
import { objectMap } from '../../helpers/object'
import { productIsVisible } from './products'

const tagFilter = (products, filters) => {
  let options = {}
  products.forEach(function (product, index, arr) {
    if (productIsVisible(product, filters, ['tag'])) {
      let tags = product.tags.forEach(tag => {
        let color = fieldValue(tag.field_color, 'jquery_colorpicker')
        let count = 0;
        if (options[tag.name]) {
          count = options[tag.name].count
        }
        options[tag.name] = {
          count: ++count,
          key: tag.name,
          style: color ? {color: '#' + color} : {}
        }
      })
    }
    if ((index + 1) >= arr.length) {
      for (let key in options) {
        if (options.hasOwnProperty(key) && options[key].count === arr.length) {
          delete options[key]
        }
      }
    }
  });
  return objectMap(options, key => options[key]);
}

export default tagFilter
