import CommentDetailsItem from "./CommentDetailsItem";
import ProductItem from "./ProductItem";
import PointsItem from "./PointsItem";

import { useSelector } from "react-redux";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const CommentDetails = ({ setCommentDetailsDisplay }) => {
  // get selected comment info from redux/reducers/profile/selectedComment.js
  const selectedComment = useSelector((state) => state.selectedComment);

  const starsArray = [1, 2, 3, 4, 5];

  return (
    <div className="w-full h-screen fixed top-0 right-0 flex justify-center items-center bg-black/10 z-30">
      <div
        className="w-8/12 flex flex-col bg-white rounded-lg overflow-y-scroll gap-4 p-6"
        style={{ maxHeight: "67%" }}
      >
        <div className="w-full flex flex-row justify-between ietms-center border-b-2 border-stone-200 pb-2">
          <h3 className="w-full text-lg font-bold text-stone-900">
            جزئیات دیدگاه
          </h3>
          <button onClick={() => setCommentDetailsDisplay(false)} type="button">
            <CloseOutlinedIcon />
          </button>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <CommentDetailsItem label={"عنوان"} value={selectedComment.title} />
          <CommentDetailsItem
            label={"وضعیت دیدگاه"}
            value={selectedComment.status}
          />
          <div className="w-full flex flex-col gap-2">
            <p className="text-md font-bold text-stone-600">ستاره ها</p>
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
          label={"توضیح"}
          value={selectedComment.description}
        />
        <CommentDetailsItem
          label={"نحوه انتشار دیدگاه"}
          value={
            selectedComment.isUnknown
              ? "دیدگاه به صورت ناشناس منتشر می شود!"
              : "دیدگاه با نام کاربری شما منتشر می شود!"
          }
        />
        <div className="w-full flex flex-col gap-2">
          <p className="text-md font-bold text-stone-600">نکات مثبت</p>
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
          <p className="text-md font-bold text-stone-600">نکات منفی</p>
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
        <p className="w-full text-md font-bold text-stone-600">محصول</p>
        <ul
          className="w-full flex flex-col justify-center items-center rounded-xl px-4"
          style={{ border: "2px solid #dbdddc" }}
        >
          <ProductItem product={selectedComment.product} />
        </ul>
        {selectedComment.status === "جاری" ? (
          <div className="w-full flex flex-row justify-center items-center gap-4">
            <button
              onClick={setTransactionFields}
              className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
              style={{
                background: "inherit",
                color: "#06291D",
                border: "2px solid #06291D",
              }}
            >
              پرداخت سفارش
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CommentDetails;
