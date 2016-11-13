import { connect } from 'react-redux'
import FilterListComp from '../components/filters'
import { getFilterOptions } from '../selectors'
import { loadFilterOptions } from '../actions'

const mapStateToProps = (state) => {
  return {
    options: getFilterOptions(state),
    activeCategory: state.activeCategory
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    close: () => {
      console.log('close');
      dispatch(loadFilterOptions(''));
    }
  }
}

const FilterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterListComp)

export default FilterList
