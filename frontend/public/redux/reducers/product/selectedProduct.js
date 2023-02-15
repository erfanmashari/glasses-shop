const selectedProduct = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_PRODUCT_PAGE_INFO_FROM_BACKEND":
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