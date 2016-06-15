import { connect } from 'react-redux'
import CartComp from '../components/cart'

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const Cart = connect(
  mapStateToProps,
  mapDispatchToProps
)(CartComp)

export default Cart
