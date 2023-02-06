// action for adding a product to cart
export const addProductToCartList = (product) => {
    return {
        product,
        type: "ADD_PRODUCT_TO_CART_LIST"
    }
}

// action for removing a product from cart
export const removeProductFromCartList = (index) => {
    return {
        index,
        type: "REMOVE_PRODUCT_FROM_CART_LIST"
    }
}