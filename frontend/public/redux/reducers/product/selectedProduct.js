const selectedProduct = (state = {}, action) => {
    switch (action.type) {
        case "SET_SELECTED_PRODUCT_INFO":
            state = action.product;
            return state;
        case "CHANGE_SELECTED_PRODUCT_PROPERTIES":
            const items = {...state};
            items[action.parameter] = action.value;
            state = items;
            return state;
        default:
            return state;
    }
}

export default selectedProduct;