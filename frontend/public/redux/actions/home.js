// action for changing products list from backend
export const changeProductsListFromBackend = (products) => {
    return {
        products,
        type: "CHANGE_PRODUCTS_LIST_FROM_BACKEND"
    }
}

// action for changing discounted products list from backend
export const changeDiscountedProductsFromBackend = (products) => {
    return {
        products,
        type: "CHANGE_DISCOUNTED_PRODUCTS_FROM_BACKEND"
    }
}