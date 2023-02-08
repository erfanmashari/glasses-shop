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

export function checkFetchResponse (response) {
  if (response.data.status === 200 || response.data.status === 201) {
    return { ok: true, data: response.data.data };
  } else {
    return { ok: false, message: response.data.data.message };
  }
};

export function toastAlert (text, type) {
  toast(text, {
    position: "top-center",
    type,
    theme: "light",
    autoClose: 5000,
  });
}
