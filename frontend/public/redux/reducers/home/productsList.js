const productsList = (state = [], action) => {
    switch (action.type) {
        case "CHANGE_PRODUCTS_LIST_FROM_BACKEND":
            state = action.products;
            return state;
        default:
            return state;
    }
}

export default productsList;