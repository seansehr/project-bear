import { connect } from 'react-redux'
import ProductList from '../components/products'
import { getVisibleProducts } from '../../helpers/products'

const mapStateToProps = (state) => {
  let products = getVisibleProducts(state.products, state.filters)
  let sortKey = state.sort.key
  let sortOrder = state.sort.sortOrders[sortKey]

  products.sort((a, b) => {
    let ret = 0
    let aKey = a[sortKey]
    let bKey = b[sortKey]
    if (sortOrder) {
      aKey = sortOrder.indexOf(aKey)
      bKey = sortOrder.indexOf(bKey)
    }
    if (sortKey == 'price') {
      a.price = parseInt(a.price)
      b.price = parseInt(b.price)
    }
    if (aKey < bKey) {
      ret = -1;
    }
    if (aKey > bKey) {
      ret = 1;
    }
    if (state.sort.order == 'desc') {
      ret = ret * -1
    }
    return ret
  })

  return {
    currency: state.currency,
    products: products.slice(0, 50)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const ProductsFiltered = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductList)

export default ProductsFiltered
