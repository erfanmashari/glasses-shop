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

const AddAddressForm = () => {
  const dispatch = useDispatch();

  const changeAddressValue = (parameter, value) => {
    dispatch(changeProfilePersonalInfo(parameter, value));
  };

  return (
    <form className="w-full flex flex-col justify-center items-center gap-4">
      <h3 className="w-full text-xl font-bold text-stone-800">
        افزودن آدرس جدید
      </h3>
      <FormFieldsContainer>
        <FormInput
          label={"نام"}
          placeholder={"نام"}
          type={"text"}
          parameter={"firstName"}
          required={true}
        />
        <FormInput
          label={"نام خانوادگی"}
          placeholder={"نام خانوادگی"}
          type={"text"}
          parameter={"lastName"}
          required={true}
        />
        <FormFieldsContainer>
          <FormInput
            label={"نام"}
            placeholder={"نام"}
            type={"text"}
            parameter={"firstName"}
            required={true}
          />
          <FormInput
            label={"نام خانوادگی"}
            placeholder={"نام خانوادگی"}
            type={"text"}
            parameter={"lastName"}
            required={true}
          />
        </FormFieldsContainer>
      </FormFieldsContainer>
    </form>
  );
};

export default AddAddressForm;
