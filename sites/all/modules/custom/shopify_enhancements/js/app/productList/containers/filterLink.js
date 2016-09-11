import { connect } from 'react-redux'
import { setFilter, clearFilter } from '../actions'
import Link from '../components/link'

let isFiltered = (state, ownProps) => {
  let ret = false
  state.filters.forEach(filter => {
    if (filter.key == ownProps.filterKey && filter.value == ownProps.value) {
      ret = true
    }
  })
  return ret
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: isFiltered(state, ownProps)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (active) => {
      if (active) {
        dispatch(clearFilter(ownProps.filterKey, ownProps.value));
      }
      else {
        dispatch(setFilter(ownProps.filterKey, ownProps.value));
      }
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink
