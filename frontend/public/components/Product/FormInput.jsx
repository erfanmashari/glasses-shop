import { useSelector, useDispatch } from "react-redux";
// import { changeProfilePersonalInfo } from "../../../redux/actions/profile";

const FormInput = ({ label, type, placeholder, parameter, required }) => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  const changeInputValue = (value) => {
    // dispatch(changeProfilePersonalInfo(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <input
        value={personalInfo[parameter] ? personalInfo[parameter] : ""}
        onChange={(e) => changeInputValue(e.target.value)}
        type={type}
        required={required ? required : false}
        placeholder={placeholder}
        className="w-full px-3 py-2 outline-none rounded-lg border-2 border-stone-300 shdow-sm shaow-stone-400"
      />
    </div>
  );
};

export default FormInput;
