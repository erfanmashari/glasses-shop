// import components
import Nav from "./Nav";
import Footer from "./Footer";
import Meta from "./Meta";

import Script from "next/script";

import { useEffect } from "react";

import { useDispatch } from "react-redux";

import { changeLoginStatus } from "../../redux/actions/login";

import { decodeJwt } from "jose";

import {
  getTokenFromCookie,
  getPhoneNumberFromCookie,
} from "../../functions";

import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // token and username
    const token = getTokenFromCookie();

    if (token) {
      let hideInfo = "";

      try {
        hideInfo = decodeJwt(token);
      } catch (e) {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }

      if (hideInfo.phoneNumber === getPhoneNumberFromCookie()) {
        dispatch(changeLoginStatus(true));
      } else {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main dir="rtl">
      <Meta />
      <Nav />
      {children}
      <Footer />
      <ToastContainer rtl={true} />
      <Script src="../path/to/flowbite/dist/flowbite.min.js"></Script>
    </main>
  );
};

export default Layout;
