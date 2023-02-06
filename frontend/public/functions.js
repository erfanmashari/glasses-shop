// get token from cookie
export function getTokenFromCookie() {
    // get token from cookie
    const allCookies = document.cookie.split(";");
    let token = null;
    allCookies.forEach((element) => {
        if (element.includes("token")) {
            const tokenSplit = element.split("=");
            token = tokenSplit[1];
        }
    });

    return token;
}

// get email from cookie
export function getEmailFromCookie() {
    // get email from cookie
    const allCookies = document.cookie.split(";");
    let email = null;
    allCookies.forEach((element) => {
        if (element.includes("email")) {
            const emailSplit = element.split("=");
            email = emailSplit[1];
        }
    });

    return email;
}

export const fetchConfig = (url, options, callback, okStatus) => {
    fetch(`${server}${url}`, options).then(res => {
        if (res.ok || (res.status >= 400 && res.status < 500)) {
            return res.json();
        }
    }).then(json => {
        if (json) {
            if (json.detail) {
                callback({ ok: false, json: json.detail})
            } else if (json.status >= 400 && json.status < 500) {
                callback({ ok: false, json: json.data})
            } else if (json.status === 200 || (okStatus && json[okStatus])) {
                callback({ ok: true, json: json.data})
            }
        }
    })
}