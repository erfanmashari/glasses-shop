import { useSelector, useDispatch } from "react-redux";
import { changeSelectedAddressesInfo } from "../../../redux/actions/profile";

const EditFormSelector = ({ label, parameter, options = [] }) => {
  const dispatch = useDispatch();

  // get selected address info from redux/reducers/profile/selectedAddress.js
  const selectedAddress = useSelector((state) => state.selectedAddress);

  const changeInputValue = (value) => {
    dispatch(changeSelectedAddressesInfo(parameter, value));
    if (parameter === "province") {
      dispatch(changeSelectedAddressesInfo("city", ""));
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-md font-bold text-stone-500">{label}</label>
      <select
        value={selectedAddress[parameter] ? selectedAddress[parameter] : ""}
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

export default EditFormSelector;
