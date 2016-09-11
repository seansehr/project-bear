const sort = (state = {key: 'title', order: 'asc', opened: false}, action) => {
  switch (action.type) {
    case 'SET_SORT':
      return {
        key: action.key,
        order: action.order,
        opened: state.opened
      };
    case 'TOGGLE_SORT_VISIBILITY':
      return {
        key: state.key,
        order: state.order,
        opened: !state.opened
      }
    default:
      return state;
  }
}

export default sort
