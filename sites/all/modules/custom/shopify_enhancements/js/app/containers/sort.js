import { connect } from 'react-redux'
import { setSort } from '../actions'
import SortComp from '../components/sort'

const mapStateToProps = (state) => {
  return {
    open: state.sortOpen,
    options: [
      {
        'key': 'price',
        'options': {
          'asc': 'Price: Low to High',
          'desc': 'Price: High to Low',
        }
      },
      {
        'key': 'size',
        'options': {
          'asc': 'Size: Big to Small',
          'desc': 'Size: Small to Big',
        }
      },
      {
        'key': 'updated_at',
        'options': {
          'asc': 'Old to New',
          'desc': 'New to Old',
        }
      },
      {
        'key': 'title',
        'options': {
          'asc': 'A to Z',
          'desc': 'Z to A',
        }
      }
    ]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sortClick: option => {
      dispatch(setSort(option.key, option.order))
    }
  }
}

const Sort = connect(
  mapStateToProps,
  mapDispatchToProps
)(SortComp)

export default Sort
