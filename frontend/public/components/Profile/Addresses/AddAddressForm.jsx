import FormFieldsContainer from "./FormFieldsContainer";
import FormInput from "./FormInput";
import FormSelector from "./FormSelector";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  resetAddressesFormFields,
  changeAddressesFormFields,
} from "../../../redux/actions/profile";

import axios from "axios";
import axiosApp from "../../../utils/axiosApp";
import { checkFetchResponse, toastAlert } from "../../../functions";

const AddAddressForm = () => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // get add new address form fields from reduc/reducer/profile/addressForm.js
  const addressForm = useSelector((state) => state.addressForm);

  // province and city selector values
  const [selectorsValues, setSelectorsValues] = useState({
    province: [],
    city: [],
  });

  const changeReceiverValue = (checked) => {
    if (checked) {
      dispatch(
        changeAddressesFormFields("receiverSpecifications", {
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          phoneNumber: personalInfo.phoneNumber,
        })
      );
    } else {
      dispatch(changeAddressesFormFields("receiverSpecifications", {}));
    }
    dispatch(changeAddressesFormFields("isMeReceiver", checked));
  };

  // change selector values options
  const changeSelectorsValues = (parameter, value) => {
    const items = { ...selectorsValues };
    items[parameter] = value;
    setSelectorsValues(items);
  };

  // send add new address request to backend
  const addNewAddress = (e) => {
    e.preventDefault();

    const reqData = { ...addressForm, userId: personalInfo._id };
    axiosApp.post("addresses", reqData).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok) {
        toastAlert(res.data.message, "success");
        dispatch(resetAddressesFormFields());
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  useEffect(() => {
    // get provices of iran from an json file in public folder
    axios.get("http://localhost:3000/provinces.json").then((res) => {
      if (res.status === 200 && res.data && res.data.length) {
        const provinceArray = [{ text: "انتخاب استان", value: "" }];
        res.data.forEach((province) => {
          provinceArray.push({ text: province.name, value: province.name });
        });
        changeSelectorsValues("province", provinceArray);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (addressForm.province) {
      // get cities of iran from an api
      axios.get(`http://localhost:3000/cities.json`).then((res) => {
        if (res.status === 200 && res.data && res.data.length) {
          const cityArray = [{ text: "انتخاب شهرستان", value: "" }];
          res.data.forEach((city) => {
            if (addressForm.province === city.province) {
              cityArray.push({ text: city.name, value: city.name });
            }
          });
          changeSelectorsValues("city", cityArray);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressForm.province]);

  return (
    <form
      onSubmit={addNewAddress}
      className="w-full flex flex-col justify-center items-center gap-4"
    >
      <h3 className="w-full text-xl font-bold text-stone-800">
        افزودن آدرس جدید
      </h3>
      <FormFieldsContainer>
        <FormSelector
          label={"استان *"}
          type={"text"}
          parameter={"province"}
          required={true}
          options={selectorsValues.province}
        />
        <FormSelector
          label={"شهر *"}
          type={"text"}
          parameter={"city"}
          required={true}
          options={selectorsValues.city}
        />
        <FormFieldsContainer>
          <FormInput
            label={"پلاک *"}
            placeholder={"پلاک"}
            type={"text"}
            parameter={"plaque"}
            required={true}
          />
          <FormInput
            label={"واحد"}
            placeholder={"واحد"}
            type={"text"}
            parameter={"unit"}
          />
        </FormFieldsContainer>
      </FormFieldsContainer>
      <FormInput
        label={"نشانی پستی *"}
        placeholder={"نشانی پستی را وارد کنید..."}
        type={"text"}
        parameter={"postalAddress"}
        required={true}
      />
      <div className="w-full flex flex-row justify-center items-end gap-4">
        <FormInput
          label={"کد پستی *"}
          placeholder={"کد پستی"}
          type={"text"}
          parameter={"postalCode"}
          required={true}
        />
        <div className="w-full relative bottom-3 flex flex-row justify-start items-center gap-2">
          <input
            type="checkbox"
            value={
              addressForm["isMeReceiver"] === true
                ? addressForm["isMeReceiver"]
                : false
            }
            onChange={(e) => changeReceiverValue(e.target.checked)}
          />
          <label className="text-md font-bold text-stone-600">
            گیرنده محصول خودم هستم.
          </label>
        </div>
      </div>
      <FormFieldsContainer>
        <FormInput
          label={"نام *"}
          placeholder={"نام"}
          type={"text"}
          parameter={"firstName"}
          required={true}
          disabled={addressForm.isMeReceiver}
          isReceiverSpecifications={true}
        />
        <FormInput
          label={"نام خانوادگی *"}
          placeholder={"نام خانوادگی"}
          type={"text"}
          parameter={"lastName"}
          required={true}
          disabled={addressForm.isMeReceiver}
          isReceiverSpecifications={true}
        />
        <FormInput
          label={"شماره همراه *"}
          placeholder={"شماره همراه"}
          type={"text"}
          parameter={"phoneNumber"}
          required={true}
          disabled={addressForm.isMeReceiver}
          isReceiverSpecifications={true}
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
        افزودن آدرس جدید
      </button>
    </form>
  );
};

export default AddAddressForm;
