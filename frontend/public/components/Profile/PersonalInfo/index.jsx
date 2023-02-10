import FormFieldsContainer from "./FormFieldsContainer";
import FormInput from "./FormInput";
import FormSelector from "./FormSelector";

import { useSelector, useDispatch } from "react-redux";
import { changeProfilePersonalInfo } from "../../../redux/actions/profile";

const PersonalInfoForm = () => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  const changeInputValue = (parameter, value) => {
    dispatch(changeProfilePersonalInfo(parameter, value));
  };

  return (
    <form className="w-9/12 flex flex-col justify-center self items-center border-t-2 border-blue-600 shadow-md rounded-lg gap-4 px-16 py-12">
      <FormFieldsContainer>
        <FormInput
          label={"نام"}
          placeholder={"نام"}
          type={"text"}
          parameter={"firstName"}
          formFields={formFields}
          changeFormField={changeFormField}
        />
        <FormInput
          label={"نام خانوادگی"}
          placeholder={"نام خانوادگی"}
          type={"text"}
          parameter={"lastName"}
          formFields={formFields}
          changeFormField={changeFormField}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <FormInput
          label={"نام کاربری"}
          placeholder={"نام کاربری"}
          type={"text"}
          parameter={"username"}
          formFields={formFields}
          changeFormField={changeFormField}
        />
        <FormSelector
          label={"جنسیت"}
          parameter={"gender"}
          options={[
            { value: "مرد", text: "مرد" },
            { value: "زن", text: "زن" },
            { value: "سایر", text: "سایر" },
          ]}
          formFields={formFields}
          changeFormField={changeFormField}
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
          formFields={formFields}
          changeFormField={changeFormField}
        />
      </FormFieldsContainer>
      <FormFieldsContainer>
        <FormInput
          label={"ایمیل"}
          placeholder={"ایمیل"}
          type={"email"}
          parameter={"email"}
          formFields={formFields}
          changeFormField={changeFormField}
        />
        <FormInput
          label={"شماره همراه"}
          placeholder={"شماره همراه"}
          type={"text"}
          parameter={"phoneNumber"}
          formFields={formFields}
          changeFormField={changeFormField}
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
