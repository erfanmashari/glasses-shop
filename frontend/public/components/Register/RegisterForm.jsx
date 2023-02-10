import FormInput from "./FormInput";
import FormSelector from "./FormSelector";

import Link from "next/link";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { resetLoginInfo, changeLoginStatus } from "../../redux/actions/login";

import axiosApp from "../../utils/axiosConfig";
import { checkFetchResponse } from "../../functions";

import { toastAlert } from "../../functions";

const RegisterForm = () => {
  const dispatch = useDispatch();

  // get login info from redux/reducer/login/loginInfo.js
  const loginInfo = useSelector((state) => state.loginInfo);

  const register = (e) => {
    e.preventDefault();

    const url = `auth/user`;

    // send phone number or code to backend
    axiosApp.post(url, loginInfo).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok) {
          toastAlert(res.data.message, "success");

          document.cookie = `token=${res.data.token}; path=${process.env.COOKIE_PATH}`;
          document.cookie = `phoneNumber=${loginInfo.phoneNumber}; path=${process.env.COOKIE_PATH}`;

          // reset login info
          dispatch(resetLoginInfo());

          // set login status to true which means user logged in
          dispatch(changeLoginStatus(true));

          const homePageLink = document.querySelector("#to-home-page-r");
          if (homePageLink) {
            homePageLink.click();
          }
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  return (
    <form
      onSubmit={register}
      className="w-7/12 h-full flex flex-col justify-center py-28 px-24 gap-6"
      style={{
        backgroundImage: "linear-gradient(to bottom, #f7e7e7, #d6b8b8)",
      }}
    >
      <Link className="hidden" href={"/"} id="to-home-page-r"></Link>
      <FormInput
        label={"نام"}
        placeholder={"نام خود را وارد کنید..."}
        parameter="firstName"
      />
      <FormInput
        label={"نام خانوادگی"}
        placeholder={"نام خانوادگی خود را وارد کنید..."}
        parameter="lastName"
      />
      <FormSelector
        label={"جنسیت"}
        parameter="gender"
        options={[
          { value: "مرد", text: "مرد" },
          { value: "زن", text: "زن" },
          { value: "سایر", text: "سایر" },
        ]}
      />
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
        ثبت نام
      </button>
    </form>
  );
};

export default RegisterForm;
