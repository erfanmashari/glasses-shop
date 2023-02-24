// action for changing tranaction form fields
export const changeTransactionInfo = (parameter, value) => {
    return {
        parameter,
        value,
        type: "CHANGE_TRANSACTION_INFO"
    }
}