// action for changing product info from backend
export const changeProductPageInfoFromBackend = (product) => {
    return {
        product,
        type: "CHANGE_PRODUCT_PAGE_INFO_FROM_BACKEND"
    }
}

// action for changing similar products from backend
export const changeSimilarProductFromBackend = (products) => {
    return {
        products,
        type: "CHANGE_SIMILAR_PRODUCT_FROM_BACKEND"
    }
}

// action for setting selected product info
export const setSelectedProductInfo = (product) => {
    return {
        product,
        type: "SET_SELECTED_PRODUCT_INFO"
    }
}

// action for changing peroperties of selected product
export const changeSelectedProductProperties = (parameter, value) => {
    return {
        parameter,
        value,
        type: "CHANGE_SELECTED_PRODUCT_PROPERTIES"
    }
}