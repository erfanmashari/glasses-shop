const selectedAddress = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_ADDRESS_INFO":
      state = action.address;
      return state;
    case "CHANGE_SELECTED_ADDRESS_INFO":
      const items = { ...state };
      items[action.parameter] = action.value;
      state = items;
      return state;
    default:
      return state;
  }
};

export default selectedAddress;
