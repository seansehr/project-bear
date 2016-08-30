import { connect } from 'react-redux'
import FilterCategoriesComp from '../components/filterCategories'
import { toggleSort } from '../actions'

const mapStateToProps = (state) => {
  return {
    products: state.products,
    filterCategories: state.filterCategories
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortOnClick: () => {
      dispatch(toggleSort())
    }
  }
}

const FilterCategories = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterCategoriesComp)

export default FilterCategories
