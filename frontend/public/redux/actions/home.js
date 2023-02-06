// action for changing products list from backend
export const changeProductsListFromBackend = (products) => {
    return {
        products,
        type: "CHANGE_PRODUCTS_LIST_FROM_BACKEND"
    }
}