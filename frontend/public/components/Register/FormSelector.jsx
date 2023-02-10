import { useSelector, useDispatch } from "react-redux";
import { changeLoginInfo } from "../../redux/actions/login";

const FormSelector = ({ label, parameter, options = [] }) => {
  const dispatch = useDispatch();

  // get login info from redux/reducer/login/loginInfo.js
  const loginInfo = useSelector((state) => state.loginInfo);

  const changeInputValue = (value) => {
    dispatch(changeLoginInfo(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-md font-bold text-stone-500">{label}</label>
      <select
        value={loginInfo[parameter] ? loginInfo[parameter] : ""}
        onChange={(e) => changeInputValue(e.target.value)}
        required={true}
        className="w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-lg bg-stone-100 shadow-stone-400"
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
