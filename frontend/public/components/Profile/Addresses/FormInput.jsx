import { useSelector, useDispatch } from "react-redux";
import { changeAddressesFormFields } from "../../../redux/actions/profile";

const FormInput = ({
  label,
  type,
  placeholder,
  parameter,
  required,
  isReceiverSpecifications,
  disabled,
}) => {
  const dispatch = useDispatch();

  // get add new address form fields from reduc/reducer/profile/addressForm.js
  const addressForm = useSelector((state) => state.addressForm);

  const changeInputValue = (value) => {
    if (isReceiverSpecifications) {
      const newReceiverSpecifications = addressForm.receiverSpecifications
        ? { ...addressForm.receiverSpecifications }
        : {};

      newReceiverSpecifications[parameter] = value;
      dispatch(
        changeAddressesFormFields(
          "receiverSpecifications",
          newReceiverSpecifications
        )
      );
    } else {
      dispatch(changeAddressesFormFields(parameter, value));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <input
        value={
          isReceiverSpecifications
            ? addressForm.receiverSpecifications &&
              addressForm.receiverSpecifications[parameter]
              ? addressForm.receiverSpecifications[parameter]
              : ""
            : addressForm[parameter]
            ? addressForm[parameter]
            : ""
        }
        onChange={(e) => changeInputValue(e.target.value)}
        type={type}
        required={required ? required : false}
        disabled={disabled ? disabled : false}
        placeholder={placeholder}
        className={`w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-sm shadow-stone-400 ${
          disabled ? "bg-stone-200" : ""
        }`}
      />
    </div>
  );
};

export default FormInput;
