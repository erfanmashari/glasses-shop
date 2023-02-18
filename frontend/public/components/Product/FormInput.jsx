import { useSelector, useDispatch } from "react-redux";
import { changeNewCommentInfo } from "../../redux/actions/product";

const FormInput = ({ label, type, placeholder, parameter }) => {
  const dispatch = useDispatch();

  // get personal info from reduc/reducer/product/newCommentInfo.js
  const newCommentInfo = useSelector((state) => state.newCommentInfo);

  const changeInputValue = (value) => {
    dispatch(changeNewCommentInfo(parameter, value));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <input
        value={newCommentInfo[parameter] ? newCommentInfo[parameter] : ""}
        onChange={(e) => changeInputValue(e.target.value)}
        type={type}
        required={true}
        placeholder={placeholder}
        className="w-full px-3 py-2 outline-none rounded-lg border-2 border-stone-300 shdow-sm shaow-stone-400"
      />
    </div>
  );
};

export default FormInput;
