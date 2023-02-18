import PointsItem from "./PointsItem";

import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { changeNewCommentInfo } from "../../redux/actions/product";

import { toastAlert } from "../../functions";

const AddCommentPoints = ({ label, placeholder, parameter }) => {
  const dispatch = useDispatch();

  // get new comment info from reduc/reducer/product/newCommentInfo.js
  const newCommentInfo = useSelector((state) => state.newCommentInfo);

  const changeInputValue = (value) => {
    dispatch(changeNewCommentInfo(parameter, value));
  };

  const [inputValue, setInputValue] = useState("");

  const points = newCommentInfo[parameter] ? newCommentInfo[parameter] : [];

  const addPoint = () => {
    const newPoints = [...points];
    if (inputValue.length >= 3) {
      newPoints.push(inputValue);
      changeInputValue(newPoints);
      setInputValue("");
    } else {
      toastAlert("نکته باید حداقل شامل سه کاراکتر باشد!", "error");
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <div className="w-full h-10 outline-none rounded-lg border-2 border-stone-300 shdow-sm shaow-stone-400 overflow-hidden">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type={"text"}
          placeholder={placeholder}
          className="w-11/12 h-full border-none outline-none px-1.5"
        />
        <button
          type="button"
          className="w-1/12 h-full bg-blue-600 text-white"
          onClick={addPoint}
        >
          +
        </button>
      </div>
      <ul className="w-full flex flex-col gap-2">
        {points.map((point, index) => (
          <PointsItem key={index} parameter={parameter} title={point} />
        ))}
      </ul>
    </div>
  );
};

export default AddCommentPoints;
