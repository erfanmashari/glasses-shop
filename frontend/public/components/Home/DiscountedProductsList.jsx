import DiscountedProductsItem from "./DiscountedProductsItem";

import { useEffect } from "react";

import axios from "axios";
import { checkFetchResponse } from "../../functions";

import { useSelector, useDispatch } from "react-redux";
import { changeDiscountedProductsFromBackend } from "../../redux/actions/home";

import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const DiscountedProductsList = () => {
  const dispatch = useDispatch();

  // get discount products from redux/reducers/home/discountedProducts.js
  const discountedProducts = useSelector((state) => state.discountedProducts);

  useEffect(() => {
    // get discount products from backend
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}products/discount`)
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          // set products in discountedProducts reducer
          dispatch(changeDiscountedProductsFromBackend(res.data.products));
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full flex flex-row justify-evenly items-center text-white gap-4 p-8"
      style={{ backgroundImage: "linear-gradient(to left, #0039d4, #4e0081)" }}
    >
      <div className="w-2/12 flex flex-col justify-between items-center text-center gap-4">
        <div className="w-full flex flex-col justify-center items-center text-center gap-4">
          <h2 className="text-2xl font-bold">
            پیشنهادات <br />
            شگفت انگیز
          </h2>
          <TimerOutlinedIcon className="w-16 h-16 text-green-600" />
        </div>
        <button className="font-bold">
          مشاهده همه
          <KeyboardArrowLeftOutlinedIcon />
        </button>
      </div>
      <ul className="w-9/12 h-60 flex flex-row bg-white text-stone-900 shadow-md rounded-xl overflow-hidden">
        {discountedProducts.map((product, index) => (
          <DiscountedProductsItem
            key={index}
            product={product}
            isLast={index === discountedProducts.length - 1 ? true : false}
          />
        ))}
      </ul>
    </div>
  );
};

export default DiscountedProductsList;
