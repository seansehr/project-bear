const filterCategories = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_FILTER_OPTIONS2':
      return []
    default:
      return state
  }
}

export default filterCategories
