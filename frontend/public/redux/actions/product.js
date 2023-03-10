// action for changing product info from backend
export const changeProductPageInfoFromBackend = (product) => {
  return {
    product,
    type: "CHANGE_PRODUCT_PAGE_INFO_FROM_BACKEND",
  };
};

// action for changing similar products from backend
export const changeSimilarProductFromBackend = (products) => {
  return {
    products,
    type: "CHANGE_SIMILAR_PRODUCT_FROM_BACKEND",
  };
};

// action for changing peroperties of selected product
export const changeSelectedProductProperties = (parameter, value) => {
  return {
    parameter,
    value,
    type: "CHANGE_SELECTED_PRODUCT_PROPERTIES",
  };
};

// action for changing new comment informations
export const changeNewCommentInfo = (parameter, value) => {
  return {
    parameter,
    value,
    type: "CHANGE_NEW_COMMENT_INFO",
  };
};

// action for resetting new comment info
export const resetNewCommentInfo = () => {
  return {
    type: "RESET_NEW_COMMENT_INFO",
  };
};

// action for resetting selected product info
export const resetSelectedProductInfo = () => {
  return {
    type: "RESET_SELECTED_PRODUCT",
  };
};
