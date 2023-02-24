const transactionInfo = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_TRANSACTION_INFO":
      const items = { ...state };
      items[action.parameter] = action.value;
      state = items;
      return state;
    default:
      return state;
  }
};

export default transactionInfo;
