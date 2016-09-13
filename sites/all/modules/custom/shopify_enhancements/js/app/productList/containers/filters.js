import { connect } from 'react-redux'
import FilterListComp from '../components/filters'
import { getFilterOptions } from '../selectors'

const mapStateToProps = (state) => {
  return {
    options: getFilterOptions(state),
    activeCategory: state.activeCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const FilterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterListComp)

export default FilterList
