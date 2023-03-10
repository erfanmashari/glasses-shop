const selectedComment = (state = {}, action) => {
  switch (action.type) {
    case "SET_SELECTED_COMMENT_INFO":
      state = action.comment;
      return state;
    default:
      return state;
  }
};

export default selectedComment;
