import CommentDetailsItem from "./CommentDetailsItem";
import ProductItem from "./ProductItem";
import PointsItem from "./PointsItem";

import { useSelector, useDispatch } from "react-redux";

import axiosApp from "../../../utils/axiosApp";
import {
  checkFetchResponse,
  toastAlert,
  getUserInfo,
  getTokenFromCookie,
} from "../../../functions";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const CommentDetails = ({ setCommentDetailsDisplay }) => {
  const dispatch = useDispatch();

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // get selected comment info from redux/reducers/profile/selectedComment.js
  const selectedComment = useSelector((state) => state.selectedComment);

  const starsArray = [1, 2, 3, 4, 5];

  // send delete comment request to backend
  const deleteComment = () => {
    axiosApp
      .delete("comments", {
        headers: {
          Authorization: getTokenFromCookie(),
        },
        data: {
          id: selectedComment._id,
          user: personalInfo._id,
        },
      })
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          setCommentDetailsDisplay(false);
          getUserInfo(dispatch);
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <div className="w-full h-screen fixed top-0 right-0 flex justify-center items-center bg-black/10 z-30">
      <div
        className="w-8/12 flex flex-col bg-white rounded-lg overflow-y-scroll gap-4 p-6"
        style={{ maxHeight: "67%" }}
      >
        <div className="w-full flex flex-row justify-between ietms-center border-b-2 border-stone-200 pb-2">
          <h3 className="w-full text-lg font-bold text-stone-900">
            ???????????? ????????????
          </h3>
          <button onClick={() => setCommentDetailsDisplay(false)} type="button">
            <CloseOutlinedIcon />
          </button>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <CommentDetailsItem label={"??????????"} value={selectedComment.title} />
          <CommentDetailsItem
            label={"?????????? ????????????"}
            value={selectedComment.status}
          />
          <div className="w-full flex flex-col gap-2">
            <p className="text-md font-bold text-stone-600">?????????? ????</p>
            <div className="flex flex-row items-center gap-1">
              {starsArray.map((star) =>
                star <= selectedComment.stars ? (
                  <StarOutlinedIcon className="text-yellow-400" key={star} />
                ) : (
                  <StarOutlineOutlinedIcon key={star} />
                )
              )}
            </div>
          </div>
        </div>
        <CommentDetailsItem
          label={"??????????"}
          value={selectedComment.description}
        />
        <CommentDetailsItem
          label={"???????? ???????????? ????????????"}
          value={
            selectedComment.isUnknown
              ? "???????????? ???? ???????? ???????????? ?????????? ???? ??????!"
              : "???????????? ???? ?????? ???????????? ?????? ?????????? ???? ??????!"
          }
        />
        <div className="w-full flex flex-col gap-2">
          <p className="text-md font-bold text-stone-600">???????? ????????</p>
          <ul className="w-full flex flex-col gap-2">
            {selectedComment.positivePoints.map((point, index) => (
              <PointsItem
                key={index}
                parameter={"positivePoints"}
                title={point}
              />
            ))}
          </ul>
        </div>
        <div className="w-full flex flex-col gap-2">
          <p className="text-md font-bold text-stone-600">???????? ????????</p>
          <ul className="w-full flex flex-col gap-2">
            {selectedComment.negativePoints.map((point, index) => (
              <PointsItem
                key={index}
                parameter={"negativePoints"}
                title={point}
              />
            ))}
          </ul>
        </div>
        <p className="w-full text-md font-bold text-stone-600">??????????</p>
        <ul
          className="w-full flex flex-col justify-center items-center rounded-xl px-4"
          style={{ border: "2px solid #dbdddc" }}
        >
          <ProductItem product={selectedComment.product} />
        </ul>
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <button
            onClick={deleteComment}
            className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
            style={{
              background: "inherit",
              color: "#06291D",
              border: "2px solid #06291D",
            }}
          >
            ?????? ????????????
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentDetails;
