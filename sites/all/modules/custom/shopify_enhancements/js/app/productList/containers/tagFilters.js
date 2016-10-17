import { connect } from 'react-redux'
import FilterComp from '../components/filter'
import { getTagFilters } from '../selectors'

const mapStateToProps = (state) => {
  let filters = getTagFilters(state);
  return {
    filterFunction: (product, filter, excludes) => {
      if (excludes.indexOf('tag') !== -1) return true
      let tags = product.shopify_product_tags.map(tag => tag.name)
      let ret = filter.values.filter(value => tags.indexOf(value) !== -1)
      return !!ret.length
    },
    filterKey: 'tag',
    values: getTagFilters(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const FilterList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterComp)

export default FilterList
