import FormInput from "./FormInput";

import Link from "next/link";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { resetLoginInfo, changeLoginStatus } from "../../redux/actions/login";

import axiosApp from "../../utils/axiosApp";
import { checkFetchResponse } from "../../functions";

import { toastAlert } from "../../functions";

const LoginForm = () => {
  const dispatch = useDispatch();

  // get login info from redux/reducer/login/loginInfo.js
  const loginInfo = useSelector((state) => state.loginInfo);

  // state for code input display status
  const [isCodeHidden, setIsCodeHidden] = useState(true);

  const login = (e) => {
    e.preventDefault();

    const url = isCodeHidden ? `auth` : `auth/confirm-code`;

    // send phone number or code to backend
    axiosApp.post(url, loginInfo).then((response) => {
      const res = checkFetchResponse(response);

      if (!isCodeHidden && res.ok) {
        if (res.data.token) {
          toastAlert(res.data.message, "success");

          document.cookie = `token=${res.data.token}; path=${process.env.COOKIE_PATH}`;
          document.cookie = `phoneNumber=${loginInfo.phoneNumber}; path=${process.env.COOKIE_PATH}`;

          // reset login info
          dispatch(resetLoginInfo())

          // set login status to true which means user logged in
          dispatch(changeLoginStatus(true));

          const homePageLink = document.querySelector("#to-home-page-l");
          if (homePageLink) {
            homePageLink.click();
          }
        } else {
          toastAlert(res.data.message, "success");
          const registerPageLink = document.querySelector("#to-register-page");
          if (registerPageLink) {
            registerPageLink.click();
          }
        }
      } else if (isCodeHidden && res.ok) {
        setIsCodeHidden(false);
        toastAlert(res.data.message, "success");
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  return (
    <form
      onSubmit={login}
      className="w-7/12 h-full flex flex-col justify-center py-28 px-24 gap-8"
      style={{
        backgroundImage: "linear-gradient(to bottom, #f7e7e7, #d6b8b8)",
      }}
    >
      <Link className="hidden" href={"/register"} id="to-register-page"></Link>
      <Link className="hidden" href={"/"} id="to-home-page-l"></Link>
      {isCodeHidden && (
        <FormInput
          label={"شماره همراه"}
          placeholder={"شماره همراه خود را وارد کنید..."}
          parameter="phoneNumber"
        />
      )}
      {!isCodeHidden && (
        <FormInput
          label={"کد تایید"}
          placeholder={"کد تایید ارسال شده را وارد کنید..."}
          parameter="code"
        />
      )}
      <div
        className="w-full flex justify-center items-center pt-4"
        style={{ borderTop: "3px solid #ffffff", color: "#ffffff" }}
      >
        <p className="text-sm" style={{ textShadow: "2px 2px 5px #3d3d3d" }}>
          See Shop
        </p>
      </div>
      <button
        type="submit"
        className="w-full text-center rounded-3xl text-white font-bold py-3"
        style={{
          backgroundImage: "linear-gradient(to bottom, #615050, #2e2626)",
        }}
      >
        {isCodeHidden ? "ارسال کد تایید" : "ثبت کد تایید"}
      </button>
    </form>
  );
};

export default LoginForm;
