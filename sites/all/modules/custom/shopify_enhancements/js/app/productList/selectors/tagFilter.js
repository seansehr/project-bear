import { fieldValue } from '../../helpers/fields'
import { objectMap } from '../../helpers/object'
import { productIsVisible } from './products'

const tagFilter = (products, filters) => {
  let options = {}
  products.forEach(function (product) {
    if (productIsVisible(product, filters, ['tag'])) {
      let tags = product.tags.forEach(tag => {
        let color = fieldValue(tag.field_color, 'jquery_colorpicker')
        options[tag.name] = {
          key: tag.name,
          style: color ? {color: '#' + color} : {}
        }
      })
    }
  });
  return objectMap(options, key => options[key]);
}

export default tagFilter
