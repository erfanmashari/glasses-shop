import FormInput from "./FormInput";
import AddCommentPoints from "./AddCommentPoints";
import Star from "./Star";

import { useSelector, useDispatch } from "react-redux";
import { changeNewCommentInfo } from "../../redux/actions/product";

import axiosApp from "../../utils/axiosApp";
import { checkFetchResponse, getUserInfo } from "../../functions";

import { toastAlert } from "../../functions";

const AddCommentForm = () => {
  const dispatch = useDispatch();

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // get product info from redux/reducers/product/productInfo.js
  const productInfo = useSelector((state) => state.productInfo);

  // get new comment info from reduc/reducer/product/newCommentInfo.js
  const newCommentInfo = useSelector((state) => state.newCommentInfo);

  const changeInputValue = (value) => {
    dispatch(changeNewCommentInfo("unknown", value));
  };

  const starsArray = [1, 2, 3, 4, 5];

  // send add new comment request to backend
  const addComment = (e) => {
    e.preventDefault();

    if (!newCommentInfo.stars) {
      toastAlert("تعداد ستاره ها را مشخص کنید!", "error");
    } else {
      const fecthBody = {
        userId: personalInfo._id,
        productId: productInfo._id,
        status: "در حال بررسی",
        ...newCommentInfo,
      };
      axiosApp.post("comments", fecthBody).then((response) => {
        const res = checkFetchResponse(response);

        if (res.ok) {
          toastAlert(res.data.message, "success");
          getUserInfo(dispatch);
        } else {
          toastAlert(res.message, "error");
        }
      });
    }
  };

  return (
    <div className="w-full h-screen fixed top-0 right-0 flex justify-center items-center bg-black/10 z-30">
      <form
        onSubmit={addComment}
        className="w-4/12 max-h-4/6 flex flex-col justify-center items-center bg-white rounded-lg ovrflow-y-scroll gap-4 p-6"
      >
        <h3 className="w-full text-lg font-bold text-stone-900 border-b-2 border-stone-200 pb-2">
          ثبت نظر جدید
        </h3>
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <label className="text-md font-bold text-stone-600">
            تعداد ستاره برای این محصول
          </label>
          <div className="flex flex-row gap-2">
            {starsArray.map((number) => (
              <Star key={number} number={number} />
            ))}
          </div>
        </div>
        <FormInput
          label={"عنوان نظر"}
          placeholder={"عنوان نظر"}
          type={"text"}
          parameter={"title"}
          required={true}
        />
        <FormInput
          label={"توضیح نظر"}
          placeholder={"توضیح نظر"}
          type={"text"}
          parameter={"description"}
          required={true}
        />
        <AddCommentPoints
          label={"نکات مثبت"}
          placeholder={"نکات مثبت محصول"}
          parameter={"positivePoints"}
        />
        <AddCommentPoints
          label={"نکات منفی"}
          placeholder={"نکات منفی محصول"}
          parameter={"negativePoints"}
        />
        <div className="w-full flex flex-row items-center gap-2">
          <input
            value={
              newCommentInfo["unknown"] ? newCommentInfo["unknown"] : false
            }
            onChange={(e) => changeInputValue(e.target.checked)}
            type={"checkbox"}
          />
          <label>انتشار نظر به صورت ناشناس!</label>
        </div>
        <button
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ثبت نظر جدید
        </button>
      </form>
    </div>
  );
};

export default AddCommentForm;
