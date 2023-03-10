const addressForm = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_ADDRESSES_FORM_FIELDS":
      const items = { ...state };
      items[action.parameter] = action.value;
      state = items;
      return state;
    case "RESET_ADDRESSES_FORM_FIELDS":
      state = {};
      return state;
    default:
      return state;
  }
};

export default addressForm;
