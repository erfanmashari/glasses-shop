import axiosApp from "./utils/axiosApp";
import { setProfilePersonalInfoFromBackend } from "./redux/actions/profile";
import { changeLoginStatus } from "./redux/actions/login";

import { toast } from "react-toastify";

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

// get phoneNumber from cookie
export function getPhoneNumberFromCookie() {
  // get phoneNumber from cookie
  const allCookies = document.cookie.split(";");
  let phoneNumber = null;
  allCookies.forEach((element) => {
    if (element.includes("phoneNumber")) {
      const phoneNumberSplit = element.split("=");
      phoneNumber = phoneNumberSplit[1];
    }
  });

  return phoneNumber;
}

export function checkFetchResponse(response) {
  if (response.data.status === 200 || response.data.status === 201) {
    return { ok: true, data: response.data.data };
  } else {
    return { ok: false, message: response.data.data.message };
  }
}

export function toastAlert(text, type) {
  toast(text, {
    position: "top-center",
    type,
    theme: "light",
    autoClose: 5000,
  });
}

// get user informations from backend
export function getUserInfo(dispatch, homePageLink) {
  const phoneNumber = getPhoneNumberFromCookie();
  if (phoneNumber) {
    axiosApp({
      method: "get",
      url: `users/${phoneNumber}`,
      headers: { Authorization: getTokenFromCookie() },
    }).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok && res.data.user) {
        dispatch(setProfilePersonalInfoFromBackend(res.data.user));
      } else {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        document.cookie = `phoneNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;

        dispatch(changeLoginStatus(false));

        if (homePageLink) {
          homePageLink.click();
        } else {
          location.reload();
        }
      }
    });
  }
}
