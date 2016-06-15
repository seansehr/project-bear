import { connect } from 'react-redux'
import ProductList from '../components/productList'
import { getVisibleProducts } from '../helpers/products'

const mapStateToProps = (state) => {
  let products = getVisibleProducts(state.products, state.filters)
  let sortKey = state.sort.key
  products.sort((a, b) => {
    let ret = 0
    if (sortKey == 'price') {
      a.price = parseInt(a.price)
      b.price = parseInt(b.price)
    }
    if (a[sortKey] < b[sortKey]) {
      ret = -1;
    }
    if (a[sortKey] > b[sortKey]) {
      ret = 1;
    }
    if (state.sort.order == 'desc') {
      ret = ret * -1
    }
    return ret
  })
  console.log(state)
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
