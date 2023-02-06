// action for changing login status
export const changeLoginStatus = (status) => {
    return {
        status,
        type: "CHANGE_LOGIN_STATUS"
    }
}