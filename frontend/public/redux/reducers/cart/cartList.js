const cartList = (state = [], action) => {
    const items = [...state];
    switch (action.type) {
        case "ADD_PRODUCT_TO_CART_LIST":
            items.push(action.product);
            state = items;
            return state;
        case "REMOVE_PRODUCT_FROM_CART_LIST":
            items.splice(action.index, 1);
            state = items;
            return state;
        default:
            return state;
    }
}

export default cartList;