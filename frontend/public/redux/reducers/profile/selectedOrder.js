const selectedOrder = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_ORDER_INFO":
      state = action.order;
      return state;
    case "RESET_SELECTED_ORDER_INFO":
      state = {};
      return state;
    default:
      return state;
  }
};

export default selectedOrder;
