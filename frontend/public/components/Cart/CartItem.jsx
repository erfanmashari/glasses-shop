import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

import axiosApp from "../../utils/axiosApp";
import {
  checkFetchResponse,
  toastAlert,
  getUserInfo,
  getTokenFromCookie,
} from "../../functions";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ isLast, product }) => {
  let imageSource = `${process.env.NEXT_PUBLIC_SERVER}products/${product.image.fileName}.jpg`;

  const dateOfNow = new Date();
  const dateOfDiscountTime = product.discountTime
    ? new Date(product.discountTime)
    : dateOfNow;

    const dispatch = useDispatch();

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // send delete product from cart request to backend
  const deleteProduct = () => {
    axiosApp
      .delete(
        "cart",
        {
          headers: {
            Authorization: getTokenFromCookie()
          },
          data: {
            user: personalInfo._id,
            id: product._id,
          }
        }
      )
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          getUserInfo(dispatch);
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
  };

  return (
    <li
      className="w-full flex flex-row justify-between items-center gap-4 p-2"
      style={{
        height: "160px",
        borderBottom: isLast ? "" : "2px solid #dbdddc",
      }}
    >
      <div className="flex flex-row gap-3">
        <div className="relative" style={{ width: "160px", height: "120px" }}>
          <Image
            fill
            src={imageSource}
            alt="product-image"
            style={{ border: "2px solid #c3c4c3" }}
            className="rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-row gap-2">
          <h3 className="text-stone-900 font-bold text-xl">
            {product.nameFa}
          </h3>
          <h3 className="text-stone-900 font-bold text-xl">
            {product.number}x
          </h3>
          </div>
          <div className="flex flex-row gap-2">
            <span>رنگ: {product.frameColor.nameFa}</span>
            <span>سایز: {product.size}</span>
          </div>
          {product.discountPercent &&
          product.discountedPrice &&
          product.discountTime &&
          dateOfNow < dateOfDiscountTime ? (
            <div className="flex flex-row gap-2">
              <span className="text-stone-400 font-bold line-through">
                {product.price} تومان
              </span>
              <span className="text-stone-600 font-bold">
                {product.discountedPrice} تومان
              </span>
            </div>
          ) : (
            <span className="text-stone-400 font-bold">
              {product.price} تومان
            </span>
          )}
        </div>
      </div>
      <div className="h-full flex justify-center items-center ml-12">
        <button
          style={{ border: "2px solid #c3c4c3" }}
          className="rounded-lg p-0.5"
          onClick={deleteProduct}
        >
          <DeleteOutlineIcon className="w-7 h-7 text-slate-500" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
