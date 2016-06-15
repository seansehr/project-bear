// main.js
import React, { PropTypes } from 'react'
import ProductsFiltered from '../containers/productsFiltered'
import FilterCategories from '../containers/filterCategories'
import FilterList from '../containers/filterList'
import ActiveFilters from '../containers/activeFilters'
import Sort from '../containers/sort'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        <ActiveFilters />
        <FilterCategories />
        <div className="filter-sort">
          <Sort />
          <FilterList />
        </div>
        <ProductsFiltered />
      </div>
    );
  }
};

export default App
