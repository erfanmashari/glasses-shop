const personalInfo = (state = {}, action) => {
  switch (action.type) {
    case "SET_PROFILE_PERSONAL_INFO_FROM_BACKEND":
      state = action.user;
      return state;
    case "CHANGE_PROFILE_PERSONAL_INFO":
      const items = { ...state };
      items[action.parameter] = action.value;
      state = items;
      return state;
    case "RESET_PROFILE_PERSONAL_INFO":
      state = {};
      return state;
    default:
      return state;
  }
};

export default personalInfo;
