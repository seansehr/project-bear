const sort = (state = {key: 'title', order: 'asc', opened: false, sortOrders: {}}, action) => {
  switch (action.type) {
    case 'SET_SORT':
      return {
        sortOrders: state.sortOrders,
        key: action.key,
        order: action.order,
        opened: state.opened
      };
    case 'TOGGLE_SORT_VISIBILITY':
      return {
        sortOrders: state.sortOrders,
        key: state.key,
        order: state.order,
        opened: !state.opened
      }
    default:
      return state;
  }
}

export default sort
