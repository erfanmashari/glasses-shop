import { useSelector, useDispatch } from "react-redux";
import { changeLoginInfo } from "../../redux/actions/login";

const FormInput = ({ label, placeholder, parameter }) => {
  const dispatch = useDispatch();

  // get login info from redux/reducer/login/loginInfo.js
  const loginInfo = useSelector((state) => state.loginInfo);

  const changeInputValue = (value) => {
    dispatch(changeLoginInfo(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <label className="text-md font-bold text-stone-500">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={loginInfo[parameter] ? loginInfo[parameter] : ""}
        onChange={(e) => changeInputValue(e.target.value)}
        required={true}
        className="w-full px-5 py-2.5 border-none outline-none rounded-3xl shadow-lg bg-stone-100 shadow-stone-400"
      />
    </div>
  );
};

export default FormInput;
