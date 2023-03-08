import FormInput from "./FormInput";

import React, { useState } from "react";

import { useSelector } from "react-redux";

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

  return (
    <div className="w-9/12 flex flex-col justify-center self items-center border-t-2 border-blue-600 shadow-md rounded-lg gap-8 p-8">
      <h3 className="w-full text-xl font-bold text-stone-800">
        {personalInfo.password ? "تغییر" : "تعیین"} رمز عبور
      </h3>
      <form className="w-full flex flex-row items-end gap-6">
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
    </div>
  );
};

export default SetPassword;
