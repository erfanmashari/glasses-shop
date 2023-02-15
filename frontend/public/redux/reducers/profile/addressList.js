const addressList = (state = [], action) => {
    switch (action.type) {
      case "SET_ADDRESSES_LIST_FROM_BACKEND":
        state = action.addresses;
        return state;
      case "RESET_ADDRESSES_LIST":
        state = [];
        return state;
      default:
        return state;
    }
  };
  
  export default addressList;
  