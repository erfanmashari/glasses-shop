import FormFieldsContainer from "./FormFieldsContainer";
import FormInput from "./FormInput";
import FormSelector from "./FormSelector";

import Link from "next/link";

import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  setProfilePersonalInfoFromBackend,
  changeProfilePersonalInfo,
} from "../../../redux/actions/profile";
import { changeLoginStatus } from "../../../redux/actions/login";

import axiosApp from "../../../utils/axiosConfig";
import {
  checkFetchResponse,
  toastAlert,
  getPhoneNumberFromCookie,
} from "../../../functions";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  const changeInputValue = (parameter, value) => {
    dispatch(changeProfilePersonalInfo(parameter, value));
  };

  useEffect(() => {
    axiosApp.get(`users/${getPhoneNumberFromCookie()}`).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok && res.data.user) {
        dispatch(setProfilePersonalInfoFromBackend(res.data.user));
      } else {
        document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;
        document.cookie = `phoneNumber=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${process.env.COOKIE_PATH}`;

        dispatch(changeLoginStatus(false));

        const homePageLink = document.querySelector("#to-home-page-p");
        if (homePageLink) {
          homePageLink.click();
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className="w-9/12 flex flex-col justify-center self items-center border-t-2 border-blue-600 shadow-md rounded-lg gap-4 px-16 py-12">
      <Link className="hidden" href={"/"} id="to-home-page-p"></Link>
      <FormFieldsContainer>
        <FormInput
          label={"نام"}
          placeholder={"نام"}
          type={"text"}
          parameter={"firstName"}
        />
        <FormInput
          label={"نام خانوادگی"}
          placeholder={"نام خانوادگی"}
          type={"text"}
          parameter={"lastName"}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <FormInput
          label={"نام کاربری"}
          placeholder={"نام کاربری"}
          type={"text"}
          parameter={"username"}
        />
        <FormSelector
          label={"جنسیت"}
          parameter={"gender"}
          options={[
            { value: "مرد", text: "مرد" },
            { value: "زن", text: "زن" },
            { value: "سایر", text: "سایر" },
          ]}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <div className="w-full flex flex-col gap-2">
          <label className="text-md font-bold text-stone-600">تاریخ تولد</label>
          <input
            value={personalInfo["birthday"] ? personalInfo["birthday"] : ""}
            onChange={(e) => changeInputValue("birthday", e.target.value)}
            type={"date"}
            required={true}
            placeholder={"تاریخ تولد"}
            className="w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-sm shadow-stone-400"
          />
        </div>
        <FormInput
          label={"شغل"}
          placeholder={"شغل"}
          type={"text"}
          parameter={"job"}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <FormInput
          label={"ایمیل"}
          placeholder={"ایمیل"}
          type={"email"}
          parameter={"email"}
        />
        <FormInput
          label={"شماره همراه"}
          placeholder={"شماره همراه"}
          type={"text"}
          parameter={"phoneNumber"}
        />
      </FormFieldsContainer>
      <button
        type="submit"
        className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4"
        style={{
          background: "inherit",
          color: "#06291D",
          border: "2px solid #06291D",
        }}
      >
        تغییر اطلاعات پروفایل
      </button>
    </form>
  );
};

export default PersonalInfoForm;
