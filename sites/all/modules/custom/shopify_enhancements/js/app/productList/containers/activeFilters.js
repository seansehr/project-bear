import { connect } from 'react-redux'
import ActiveFiltersComp from '../components/activeFilters'
import { productIsVisible } from '../../helpers/products'
import { objectMap } from '../../helpers/object'
import { clearAllFilters } from '../actions'

const mapStateToProps = state => {
  return {
    filters: state.filters.sort((a, b) => {
      if (a.key < b.key) {
        return -1
      }
      if (a.key > b.key) {
        return 1
      }
      if (a.value < b.value) {
        return -1
      }
      if (a.value > b.value) {
        return 1
      }
      return 0
    })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearFilter: () => {
      dispatch(clearAllFilters());
    }
  }
}

const ActiveFilters = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveFiltersComp)

export default ActiveFilters
