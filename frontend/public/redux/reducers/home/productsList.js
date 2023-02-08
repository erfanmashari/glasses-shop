const productsList = (state = {
    eyeGlasses: [],
    screenGlasses: [],
    sunGlasses: [],
}, action) => {
    switch (action.type) {
        case "CHANGE_PRODUCTS_LIST_FROM_BACKEND":
            const items = {...state};
            items[action.category] = action.products
            state = items;
            return state;
        default:
            return state;
    }
}

export default productsList;