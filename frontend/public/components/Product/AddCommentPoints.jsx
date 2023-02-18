import PointsItem from "./PointsItem";

const AddCommentPoints = ({ label, placeholder, parameter }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-md font-bold text-stone-600">{label}</label>
      <div className="w-full h-10 outline-none rounded-lg border-2 border-stone-300 shdow-sm shaow-stone-400 overflow-hidden">
        <input
        //   value={personalInfo[parameter] ? personalInfo[parameter] : ""}
        //   onChange={(e) => changeInputValue(e.target.value)}
          type={"text"}
          placeholder={placeholder}
          className="w-11/12 h-full border-none outline-none px-1.5"
        />
        <button className="w-1/12 h-full bg-blue-600 text-white">+</button>
      </div>
      <ul className="w-full flex flex-col gap-2">
        <PointsItem parameter={parameter} />
        <PointsItem parameter={parameter} />
      </ul>
    </div>
  );
};

export default AddCommentPoints;
