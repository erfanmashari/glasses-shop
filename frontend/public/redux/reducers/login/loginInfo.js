const loginInfo = (
  state = {
    phoneNumber: "",
    code: "",
    firstName: "",
    lastName: "",
    gender: "مرد",
  },
  action
) => {
  switch (action.type) {
    case "CHANGE_LOGIN_INFO":
      const items = { ...state };
      items[action.parameter] = action.value;
      state = items;
      return state;
    case "RESET_LOGIN_INFO":
      state = {
        phoneNumber: "",
        code: "",
        firstName: "",
        lastName: "",
        gender: "مرد",
      };
      return state;
    default:
      return state;
  }
};

export default loginInfo;
