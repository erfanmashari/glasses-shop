import FormFieldsContainer from "./FormFieldsContainer";
import EditFormInput from "./EditFormInput";
import EditFormSelector from "./EditFormSelector";

import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeSelectedAddressesInfo } from "../../../redux/actions/profile";

import axios from "axios";
import axiosApp from "../../../utils/axiosApp";
import {
  checkFetchResponse,
  toastAlert,
  getTokenFromCookie,
  getUserInfo,
} from "../../../functions";

const EditselectedAddress = ({ setAddressDetailsDisplay }) => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // get selected address info from redux/reducers/profile/selectedAddress.js
  const selectedAddress = useSelector((state) => state.selectedAddress);

  // province and city selector values
  const [provincesList, setProvincesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);

  const changeReceiverValue = (checked) => {
    if (checked) {
      dispatch(
        changeSelectedAddressesInfo("receiverSpecifications", {
          firstName: personalInfo.firstName,
          lastName: personalInfo.lastName,
          phoneNumber: personalInfo.phoneNumber,
        })
      );
    } else {
      dispatch(changeSelectedAddressesInfo("receiverSpecifications", {}));
    }
    dispatch(changeSelectedAddressesInfo("isMeReceiver", checked));
  };

  // send edit address info request to backend
  const editAddress = (e) => {
    e.preventDefault();

    const reqData = {
      ...selectedAddress,
      id: selectedAddress._id,
      _id: undefined,
    };
    axiosApp
      .put("addresses", reqData, {
        headers: { Authorization: getTokenFromCookie() },
      })
      .then((response) => {
        const res = checkFetchResponse(response);

        if (res.ok) {
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  // send delete address request to backend
  const deleteAddress = () => {
    axiosApp
      .delete("addresses", {
        headers: {
          Authorization: getTokenFromCookie(),
        },
        data: {
          id: selectedAddress._id,
          user: personalInfo._id,
        },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          setAddressDetailsDisplay(false);
          getUserInfo(dispatch);
          toastAlert(res.data.message, "success");
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
        setProvincesList(provinceArray);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedAddress.province) {
      // get cities of iran from an api
      axios.get(`http://localhost:3000/cities.json`).then((res) => {
        if (res.status === 200 && res.data && res.data.length) {
          const cityArray = [{ text: "انتخاب شهرستان", value: "" }];
          res.data.forEach((city) => {
            if (selectedAddress.province === city.province) {
              cityArray.push({ text: city.name, value: city.name });
            }
          });
          setCitiesList(cityArray);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAddress.province]);

  return (
    <form
      onSubmit={editAddress}
      className="w-full flex flex-col justify-center items-center gap-4"
    >
      <h3 className="w-full text-xl font-bold text-stone-800">
        افزودن آدرس جدید
      </h3>
      <FormFieldsContainer>
        <EditFormSelector
          label={"استان *"}
          type={"text"}
          parameter={"province"}
          required={true}
          options={provincesList}
        />
        <EditFormSelector
          label={"شهر *"}
          type={"text"}
          parameter={"city"}
          required={true}
          options={citiesList}
        />
        <FormFieldsContainer>
          <EditFormInput
            label={"پلاک *"}
            placeholder={"پلاک"}
            type={"text"}
            parameter={"plaque"}
            required={true}
          />
          <EditFormInput
            label={"واحد"}
            placeholder={"واحد"}
            type={"text"}
            parameter={"unit"}
          />
        </FormFieldsContainer>
      </FormFieldsContainer>
      <EditFormInput
        label={"نشانی پستی *"}
        placeholder={"نشانی پستی را وارد کنید..."}
        type={"text"}
        parameter={"postalAddress"}
        required={true}
      />
      <div className="w-full flex flex-row justify-center items-end gap-4">
        <EditFormInput
          label={"کد پستی *"}
          placeholder={"کد پستی"}
          type={"text"}
          parameter={"postalCode"}
          required={true}
        />
        <div className="w-full relative bottom-3 flex flex-row justify-start items-center gap-2">
          <input
            type="checkbox"
            checked={
              selectedAddress["isMeReceiver"] === true ||
              selectedAddress["isMeReceiver"] === "true"
                ? true
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
        <EditFormInput
          label={"نام *"}
          placeholder={"نام"}
          type={"text"}
          parameter={"firstName"}
          required={true}
          disabled={selectedAddress.isMeReceiver}
          isReceiverSpecifications={true}
        />
        <EditFormInput
          label={"نام خانوادگی *"}
          placeholder={"نام خانوادگی"}
          type={"text"}
          parameter={"lastName"}
          required={true}
          disabled={selectedAddress.isMeReceiver}
          isReceiverSpecifications={true}
        />
        <EditFormInput
          label={"شماره همراه *"}
          placeholder={"شماره همراه"}
          type={"text"}
          parameter={"phoneNumber"}
          required={true}
          disabled={selectedAddress.isMeReceiver}
          isReceiverSpecifications={true}
        />
      </FormFieldsContainer>
      <div className="w-full flex flex-row justify-center items-center gap-4">
        <button
          type="submit"
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ویرایش آدرس
        </button>
        <button
          type="button"
          onClick={deleteAddress}
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          حذف آدرس
        </button>
      </div>
    </form>
  );
};

export default EditselectedAddress;
