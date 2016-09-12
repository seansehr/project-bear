import { connect } from 'react-redux'
import categoriesComp from '../components/categories'
import { toggleSortVisibility } from '../actions'

const mapStateToProps = (state) => {
  return {
    products: state.products,
    categories: state.categories,
    sortOpened: state.sort.opened
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortOnClick: () => {
      dispatch(toggleSortVisibility())
    }
  }
}

const categories = connect(
  mapStateToProps,
  mapDispatchToProps
)(categoriesComp)

export default categories
