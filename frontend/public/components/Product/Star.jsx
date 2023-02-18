import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

import { useSelector, useDispatch } from "react-redux";
import { changeNewCommentInfo } from "../../redux/actions/product";

const Star = ({ number }) => {
  const dispatch = useDispatch();

  // get new comment info from reduc/reducer/product/newCommentInfo.js
  const newCommentInfo = useSelector((state) => state.newCommentInfo);

  const changeInputValue = () => {
    dispatch(changeNewCommentInfo("stars", number));
  };

  return (
    <>
      {newCommentInfo.stars && newCommentInfo.stars >= number ? (
        <StarOutlinedIcon
          className="cursor-pointer text-yellow-400"
          onClick={changeInputValue}
        />
      ) : (
        <StarOutlineOutlinedIcon
          className="cursor-pointer"
          onClick={changeInputValue}
        />
      )}
    </>
  );
};

export default Star;
