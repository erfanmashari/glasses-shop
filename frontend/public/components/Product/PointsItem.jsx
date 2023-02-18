import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const PointsItem = ({ parameter, title }) => {
  return (
    <li className="w-full flex flex-row justify-between items-center">
      <div className="flex flex-row justidy-center items-center gap-2">
        <span
          className={`text-xl ${
            parameter === "positivePoints" ? "text-yellow-400" : "text-red-600"
          }`}
        >
          {parameter === "positivePoints" ? "+" : "-"}
        </span>
        <p>{title}</p>
      </div>
      <button type="button">
        <DeleteOutlineOutlinedIcon className="text-red-600" />
      </button>
    </li>
  );
};

export default PointsItem;
