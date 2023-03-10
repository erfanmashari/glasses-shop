// action for changing tranaction form fields
export const changeTransactionInfo = (parameter, value) => {
  return {
    parameter,
    value,
    type: "CHANGE_TRANSACTION_INFO",
  };
};

// action for resetting transaction info
export const resetTransactionInfo = () => {
  return {
    type: "RESET_TRANSACTION_INFO",
  };
};
