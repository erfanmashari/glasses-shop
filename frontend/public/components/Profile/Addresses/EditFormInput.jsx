import { useSelector, useDispatch } from "react-redux";
import { changeSelectedAddressesInfo } from "../../../redux/actions/profile";

const EditFormInput = ({
  label,
  type,
  placeholder,
  parameter,
  required,
  isReceiverSpecifications,
  disabled,
}) => {
  const dispatch = useDispatch();

  // get selected address info from redux/reducers/profile/selectedAddress.js
  const selectedAddress = useSelector((state) => state.selectedAddress);

  const changeInputValue = (value) => {
    if (isReceiverSpecifications) {
      const newReceiverSpecifications = selectedAddress.receiverSpecifications
        ? { ...selectedAddress.receiverSpecifications }
        : {};

      newReceiverSpecifications[parameter] = value;
      dispatch(
        changeSelectedAddressesInfo(
          "receiverSpecifications",
          newReceiverSpecifications
        )
      );
    } else {
      dispatch(changeSelectedAddressesInfo(parameter, value));
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <input
        value={
          isReceiverSpecifications
            ? selectedAddress.receiverSpecifications &&
              selectedAddress.receiverSpecifications[parameter]
              ? selectedAddress.receiverSpecifications[parameter]
              : ""
            : selectedAddress[parameter]
            ? selectedAddress[parameter]
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

export default EditFormInput;
