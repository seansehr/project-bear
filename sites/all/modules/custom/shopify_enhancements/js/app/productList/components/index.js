// main.js
import React, { PropTypes } from 'react'
import Products from '../containers/products'
import Categories from '../containers/categories'
import Filters from '../containers/filters'
import ActiveFilters from '../containers/activeFilters'
import Sort from '../containers/sort'

class App extends React.Component {
  render() {
    return (
      <div className="product-list">
        <ActiveFilters />
        <Categories />
        <Sort />
        <Filters />
        <Products />
      </div>
    );
  }
};

export default App
