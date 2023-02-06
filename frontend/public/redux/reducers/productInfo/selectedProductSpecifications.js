const selectedProductSpecifications = (state = {
    id: null,
    name: null,
    image: null,
    color: {},
    size: null,
    warranty: {},
    insurance: {},
    provider: {},
    is_available: null,
    product_purchase_number: null,
    quantity_in_stock: null,
    price: null,
    discount_percent: null,
    discounted_price: null,
}, action) => {
    switch (action.type) {
        case "CHANGE_SELECTED_PRODUCT_SPECIFICATIONS_STATE":
            state = action.state;
            return state;
        case "CHANGE_SELECTED_PRODUCT_SPECIFICATIONS":
            const items = {...state};
            items[action.parameter] = action.value;
            state = items;
            return state;
        default:
            return state;
    }
}

export default selectedProductSpecifications;