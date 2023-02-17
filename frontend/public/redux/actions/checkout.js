// action for changing order informations
export const changeOrderInfo = (parameter, value) => {
    return {
        parameter,
        value,
        type: "CHANGE_ORDER_INFO"
    }
}

// action for resetting order informations
export const resetOrderInfo = () => {
    return {
        type: "RESET_ORDER_INFO"
    }
}