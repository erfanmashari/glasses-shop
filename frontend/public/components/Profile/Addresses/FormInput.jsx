import { useSelector, useDispatch } from "react-redux";
import { changeAddressesFormFields } from "../../../redux/actions/profile";

const FormInput = ({ label, type, placeholder, parameter, required }) => {
  const dispatch = useDispatch();

  // get add new address form fields from reduc/reducer/profile/addressForm.js
  const addressForm = useSelector((state) => state.addressForm);

  const changeInputValue = (value) => {
    dispatch(changeAddressesFormFields(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <input
        value={addressForm[parameter] ? addressForm[parameter] : ""}
        onChange={(e) => changeInputValue(e.target.value)}
        type={type}
        required={required ? required : false}
        placeholder={placeholder}
        className="w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-sm shadow-stone-400"
      />
    </div>
  );
};

export default FormInput;
