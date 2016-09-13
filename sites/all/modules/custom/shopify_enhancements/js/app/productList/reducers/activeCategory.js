const activeCategory = (state = false, action) => {
  switch (action.type) {
    case 'SET_CATEGORY':
      return action.category
    default:
      return state
  }
}

export default activeCategory
