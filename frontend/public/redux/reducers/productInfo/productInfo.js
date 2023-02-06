const productInfo = (state = {}, action) => {
    switch (action.type) {
        case "CHANGE_PRODUCT_INFO_FROM_BACKEND":
            state = action.product;
            return state;
        default:
            return state;
    }
}

export default productInfo;