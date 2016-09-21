import { connect } from 'react-redux'
import ProductComp from '../components/product'

const mapStateToProps = (state) => {
  return {
    currency: state.currency
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      let product = ownProps.data
      let variant = product.variants[Object.keys(product.variants)[0]]
      Drupal.behaviors.shopify_enhancements_cart.addToCart(product.product_id, variant.variant_id);
    }
  }
}

const Product = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductComp);

export default Product
