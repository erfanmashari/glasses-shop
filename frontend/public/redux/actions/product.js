// action for changing product info from backend
export const changeProductPageInfoFromBackend = (product) => {
    return {
        product,
        type: "CHANGE_PRODUCT_PAGE_INFO_FROM_BACKEND"
    }
}

// action for changing state specifications of selected product
export const changeSelectedProductSpecificationsState = (state) => {
    return {
        state,
        type: "CHANGE_SELECTED_PRODUCT_SPECIFICATIONS_STATE"
    }
}

// action for changing specifications of selected product
export const changeSelectedProductSpecifications = (parameter, value) => {
    return {
        parameter,
        value,
        type: "CHANGE_SELECTED_PRODUCT_SPECIFICATIONS"
    }
}