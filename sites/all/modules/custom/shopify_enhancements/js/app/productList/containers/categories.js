import { connect } from 'react-redux'
import FilterCategoriesComp from '../components/categories'
import { toggleSortVisibility } from '../actions'

const mapStateToProps = (state) => {
  return {
    products: state.products,
    filterCategories: state.filterCategories,
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

const FilterCategories = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCategoriesComp)

export default FilterCategories
