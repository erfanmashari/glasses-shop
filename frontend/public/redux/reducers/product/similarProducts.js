const similarProducts = (state = [], action) => {
    switch (action.type) {
        case "CHANGE_SIMILAR_PRODUCT_FROM_BACKEND":
            state = action.products;
            return state;
        default:
            return state;
    }
}

export default similarProducts;