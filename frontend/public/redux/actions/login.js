// action for changing login status
export const changeLoginStatus = (status) => {
    return {
        status,
        type: "CHANGE_LOGIN_STATUS"
    }
}

// action for changing login info for user login
export const changeLoginInfo = (parameter, value) => {
    return {
        value,
        parameter,
        type: "CHANGE_LOGIN_INFO"
    }
}