// action for setting profile personal info from backend
export const setProfilePersonalInfoFromBackend = (user) => {
    return {
        user,
        type: "SET_PROFILE_PERSONAL_INFO_FROM_BACKEND"
    }
}

// action for changing profile personal info
export const changeProfilePersonalInfo = (parameter, value) => {
    return {
        parameter,
        value,
        type: "CHANGE_PROFILE_PERSONAL_INFO"
    }
}

// action for resetting profile personal info
export const resetProfilePersonalInfo = () => {
    return {
        type: "RESET_PROFILE_PERSONAL_INFO"
    }
}

// action for setting addresses list from backend
export const setAddressesListFromBackend = (addresses) => {
    return {
        addresses,
        type: "SET_ADDRESSES_LIST_FROM_BACKEND"
    }
}

// action for changing addresses form fields
export const changeAddressesFormFields = (parameter, value) => {
    return {
        parameter,
        value,
        type: "CHANGE_ADDRESSES_FORM_FIELDS"
    }
}

// action for resetting addresses form fields
export const resetAddressesFormFields = () => {
    return {
        type: "RESET_ADDRESSES_FORM_FIELDS"
    }
}

// action for setting selected order info
export const setSelectedOrderInfo = (order) => {
    return {
        order,
        type: "SET_SELECTED_ORDER_INFO"
    }
}

// action for setting selected comment info
export const setSelectedCommentInfo = (comment) => {
    return {
        comment,
        type: "SET_SELECTED_COMMENT_INFO"
    }
}
