import { connect } from 'react-redux'
import { setSort } from '../actions'
import SortComp from '../components/sort'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    open: state.sortOpen,
    options: [
      {
        'name': 'Price: High to Low',
        'key': 'price',
        'order': 'desc'
      },
      {
        'name': 'Price: Low to Hight',
        'key': 'price',
        'order': 'asc'
      },
      {
        'name': 'Size: Big to Small',
        'key': 'size',
        'order': 'asc'
      },
      {
        'name': 'Size: Small to Big',
        'key': 'size',
        'order': 'desc'
      },
      {
        'name': 'Old to New',
        'key': 'updated_at',
        'order': 'asc'
      },
      {
        'name': 'New to High',
        'key': 'updated_at',
        'order': 'desc'
      },
      {
        'name': 'A to Z',
        'key': 'title',
        'order': 'asc'
      },
      {
        'name': 'Z to A',
        'key': 'title',
        'order': 'desc'
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
