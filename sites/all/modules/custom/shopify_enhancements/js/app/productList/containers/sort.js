import { connect } from 'react-redux'
import { setSort } from '../actions'
import SortComp from '../components/sort'
import { getStatusFilters } from '../selectors'
import TagFilters from '../containers/tagFilters'
import { getTagFilters } from '../selectors'

const mapStateToProps = (state) => {
  return {
    open: state.sort.opened,
    options: [
      {
        'key': 'price',
        'options': {
          'desc': 'Price: High to Low',
          'asc': 'Price: Low to High',
        }
      },
      {
        'key': 'size',
        'options': {
          'desc': 'Size: Big to Small',
          'asc': 'Size: Small to Big',
        }
      },
      {
        'key': 'updated_at',
        'options': {
          'desc': 'New to Old',
          'asc': 'Old to New',
        }
      },
      {
        'key': 'title',
        'options': {
          'asc': 'A to Z',
          'desc': 'Z to A',
        }
      }
    ],
    tagFilters: getTagFilters(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sortClick: (key, dir) => {
      dispatch(setSort(key, dir))
    }
  }
}

const Sort = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortComp)

export default Sort
