const orderInfo = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_ORDER_INFO":
            const items = {...state};
            items[action.parameter] = action.value;
            state = items;
            return state;
        case "RESET_ORDER_INFO":
            state = {};
            return state;
        default:
            return state;
    }
}

export default orderInfo;