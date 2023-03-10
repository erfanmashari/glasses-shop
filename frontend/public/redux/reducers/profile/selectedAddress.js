const selectedAddress = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_ADDRESS_INFO":
      state = action.address;
      return state;
    default:
      return state;
  }
};

export default selectedAddress;
