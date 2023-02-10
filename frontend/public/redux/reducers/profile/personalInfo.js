const personalInfo = (state = {}, action) => {
  switch (action.type) {
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
