const discountedProducts = (state = [], action) => {
    switch (action.type) {
        case "CHANGE_DISCOUNTED_PRODUCTS_FROM_BACKEND":
            state = action.products;
            return state;
        default:
            return state;
    }
}

export default discountedProducts;