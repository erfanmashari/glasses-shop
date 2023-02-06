const isLoggedIn = (state = false, action) => {
    switch (action.type) {
        case "CHANGE_LOGIN_STATUS":
            state = action.status;
            return state;
        default:
            return state;
    }
}

export default isLoggedIn;