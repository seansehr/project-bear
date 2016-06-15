const filters = (state = [], action) => {
  let nextState = state.slice(0);
  switch (action.type) {
    case 'SET_FILTER':
      nextState.push({
        key: action.key,
        value: action.value
      })
      return nextState;
    case 'CLEAR_FILTER':
      let index = -1
      nextState.forEach((filter, i) => {
        if (filter.key == action.key && filter.value == action.value) {
          index = i
        }
      })
      if (index !== -1) {
        nextState.splice(index, 1)
      }
      return nextState;
    case 'CLEAR_FILTERS':
      return [];
    default:
      return state;
  }
}

export default filters
