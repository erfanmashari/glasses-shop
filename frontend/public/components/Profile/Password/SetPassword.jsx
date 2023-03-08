import FormInput from "./FormInput";

import React, { useState } from "react";

import { useSelector } from "react-redux";

import axiosApp from "../../../utils/axiosApp";
import { checkFetchResponse, toastAlert } from "../../../functions";

const SetPassword = () => {
  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // set password form fields values
  const [formFields, setFormFields] = useState({
    password: "",
    confirmPassword: "",
  });

  const changeInputValue = (parameter, value) => {
    const items = { ...formFields };
    items[parameter] = value;
    setFormFields(items);
  };

  // send password request to backend
  const setPassword = (e) => {
    e.preventDefault();

    const reqData = { ...formFields, userId: personalInfo._id };
    axiosApp.post("password", reqData).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok) {
        toastAlert(res.data.message, "success");
        setFormFields({
          password: "",
          confirmPassword: "",
        });
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  return (
    <div className="w-9/12 flex flex-col justify-center self items-center border-t-2 border-blue-600 shadow-md rounded-lg gap-8 px-12 py-16">
      <h3 className="w-full text-xl font-bold text-stone-800">
        {personalInfo.password ? "تغییر" : "تعیین"} رمز عبور
      </h3>
      <form
        onSubmit={setPassword}
        className="w-full flex flex-row items-end gap-6"
      >
        <FormInput
          width={"w-5/12"}
          label={"رمز عبور"}
          placeholder={"رمز عبور"}
          parameter="password"
          formFields={formFields}
          changeInputValue={changeInputValue}
        />
        <FormInput
          width={"w-5/12"}
          label={"تایید رمز عبور"}
          placeholder={"تایید رمز عبور"}
          parameter="confirmPassword"
          formFields={formFields}
          changeInputValue={changeInputValue}
        />
        <button
          type="submit"
          className="w-2/12 h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          {personalInfo.password ? "تغییر" : "تعیین"} رمز عبور{" "}
        </button>
      </form>
      <ul className="w-full flex flex-col list-disc gap-2 px-5">
        <li>رمز عبور باید حداقل 8 کاراکتر باشد!</li>
        <li>رمز عبور باید شامل حروف کوچک انگلیسی باشد!</li>
        <li>رمز عبور باید شامل حروف بزرگ انگلیسی باشد!</li>
        <li>رمز عبور باید شامل اعداد باشد!</li>
        <li>رمز عبور باید شامل کاراکتر خاص($@#&!) باشد!</li>
      </ul>
    </div>
  );
};

export default SetPassword;
