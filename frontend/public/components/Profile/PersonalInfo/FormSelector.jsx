import { useSelector, useDispatch } from "react-redux";
import { changeProfilePersonalInfo } from "../../../redux/actions/profile";

const FormSelector = ({ label, parameter, options = [] }) => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  const changeInputValue = (value) => {
    dispatch(changeProfilePersonalInfo(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-md font-bold text-stone-500">{label}</label>
      <select
        value={personalInfo[parameter] ? personalInfo[parameter] : ""}
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
