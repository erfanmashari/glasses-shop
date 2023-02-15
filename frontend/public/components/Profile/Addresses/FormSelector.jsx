import { useSelector, useDispatch } from "react-redux";
import { changeAddressesFormFields } from "../../../redux/actions/profile";

const FormSelector = ({ label, parameter, options = [] }) => {
  const dispatch = useDispatch();

  // get add new address form fields from reduc/reducer/profile/addressForm.js
  const addressForm = useSelector((state) => state.addressForm);

  const changeInputValue = (value) => {
    dispatch(changeAddressesFormFields(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-md font-bold text-stone-500">{label}</label>
      <select
        value={addressForm[parameter] ? addressForm[parameter] : ""}
        onChange={(e) => changeInputValue(e.target.value)}
        required={true}
        className="w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-sm shadow-stone-400"
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelector;
