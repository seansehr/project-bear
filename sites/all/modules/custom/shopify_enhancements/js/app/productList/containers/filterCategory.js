import { connect } from 'react-redux'
import { loadFilterOptions } from '../actions'
import Link from '../../helpers/components/link'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.value === state.selectedFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (active) => {
      if (active) {
        dispatch(loadFilterOptions(''));
      }
      else {
        dispatch(loadFilterOptions(ownProps.value));
      }
    }
  }
}

const FilterCategory = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterCategory
