const sort = (state = {key: 'title', order: 'asc'}, action) => {
  switch (action.type) {
    case 'SET_SORT':
      return {
        key: action.key,
        order: action.order
      };
    default:
      return state;
  }
}

export default sort
