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
