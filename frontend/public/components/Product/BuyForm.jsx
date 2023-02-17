import Image from "next/image";

import Countdown from "react-countdown";

import { useSelector, useDispatch } from "react-redux";
import { changeSelectedProductProperties } from "../../redux/actions/product";

import axiosApp from "../../utils/axiosApp";
import { checkFetchResponse, toastAlert, getUserInfo } from "../../functions";

import { Tooltip } from "flowbite-react";

import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const BuyForm = () => {
  const dispatch = useDispatch();

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // get product info from redux/reducers/product/productInfo.js
  const productInfo = useSelector((state) => state.productInfo);

  // get selected product info from redux/reducers/product/selectedProduct.js
  const selectedProduct = useSelector((state) => state.selectedProduct);

  const chooseProductColor = (color) => {
    if (color.isAvailable === "true" || color.isAvailable === true) {
      dispatch(changeSelectedProductProperties("frameColor", color));
    }
  };

  const chooseProductSize = (size) => {
    dispatch(changeSelectedProductProperties("size", size));
  };

  // send add product to cart request
  const addProductToCart = (e) => {
    e.preventDefault();

    const selectedProductInfo = { ...selectedProduct };
    selectedProductInfo.userId = personalInfo._id;
    if (!selectedProductInfo.frameColor) {
      toastAlert("رنگ محصول را انتخاب کنید!", "error");
    } else if (!selectedProductInfo.size) {
      toastAlert("سایز محصول را انتخاب کنید!", "error");
    } else {
      axiosApp.post("cart", selectedProductInfo).then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          getUserInfo(dispatch);
          toastAlert(res.data.message, "success");
        } else {
          toastAlert(res.message, "error");
        }
      });
    }
  };

  // send add faviorite product request to backend
  const addFavorite = () => {
    axiosApp.post("favorites", {
      userId: personalInfo._id,
      productId: productInfo._id,
    }).then((response) => {
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
    <form
      onSubmit={addProductToCart}
      className="w-1/3 flex flex-col justify-start items-start gap-3 p-4"
      style={{ background: "#f8f8f8" }}
    >
      <div className="w-full flex flex-row justify-between items-center">
        <span className="text-sm" style={{ color: "#6e6e6e" }}>
          خانه / {productInfo.category}
        </span>
        <button type="button" onClick={addFavorite}>
          <FavoriteBorderOutlinedIcon />
        </button>
      </div>
      <h2 className="w-full text-lg font-bold">{productInfo.nameFa}</h2>
      <h2 className="w-full text-md border-b-2 border-stone-200 text-stone-500 font-bold pb-2">
        {productInfo.nameEn}
      </h2>
      {productInfo.features.length ? (
        <div className="w-full flex flex-col justify-start items-start border-b-2 border-stone-200 gap-1 pb-3">
          <h2 className="w-full text-md font-bold">ویژگی ها</h2>
          <ul className="w-full flex flex-col justify-start items-start gap-1 mr-4 list-disc">
            {productInfo.features.map((feature, index) => (
              <li key={index} className="text-sm text-stone-500">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
      <div className="w-full flex flex-row justify-between items-center border-b-2 border-stone-200 pb-2">
        <h4>فروشنده</h4>
        <span className="font-bold">
          {selectedProduct.frameColor
            ? selectedProduct.frameColor.seller.nameFa
            : "مشخص نشده"}
        </span>
      </div>
      <h2 className="w-full text-md font-bold border-b-2 border-stone-200 pb-2">
        کالا اصل {productInfo.isOriginal ? "است" : "نیست"}
      </h2>
      <div className="w-full flex flex-row justify-between items-center border-b-2 border-stone-200 pb-2">
        <h4 className="flex flex-row justify-center items-center gap-2">
          {productInfo.brand.image && (
            <div className="w-7 h-7 relative border-2 border-stone-700">
              <Image
                fill={true}
                alt={"product image"}
                src={`${process.env.NEXT_PUBLIC_SERVER}brands/${productInfo.brand.image.fileName}.jpg`}
              />
            </div>
          )}
          {productInfo.brand.nameFa}
        </h4>
        <span
          className={`font-bold ${
            productInfo.discountPercent &&
            productInfo.discountedPrice &&
            productInfo.discountTime &&
            "line-through text-stone-500"
          }`}
        >
          {productInfo.price} تومان
        </span>
      </div>
      {productInfo.discountPercent &&
      productInfo.discountedPrice &&
      productInfo.discountTime ? (
        <>
          <div className="w-full flex flex-row justify-between items-center border-b-2 border-stone-200 pb-2">
            <h4>قیمت با تخفیف {productInfo.discountPercent}%</h4>
            <span className="font-bold">
              {productInfo.discountedPrice} تومان
            </span>
          </div>
          <div className="w-full flex flex-row justify-between items-center border-b-2 border-stone-200 pb-2">
            <h4>زمان تخفیف</h4>
            <span className="font-bold">
              <Countdown date={productInfo.discountTime} />
            </span>
          </div>
        </>
      ) : (
        ""
      )}
      <label className="text-stone-700 font-bold">انتخاب رنگ</label>
      <div className="w-full flex flex-row justify-start items-center gap-2">
        {productInfo.frameColors.map((color, index) => (
          <Tooltip key={index} content={color.nameFa}>
            <button
              onClick={() => chooseProductColor(color)}
              data-tooltip-target="tooltip-default"
              type="button"
              className={`w-8 h-8 border-2 ${
                selectedProduct.frameColor &&
                selectedProduct.frameColor.nameFa === color.nameFa &&
                selectedProduct.frameColor.nameEn === color.nameEn &&
                selectedProduct.frameColor.color === color.color
                  ? "border-blue-600"
                  : "border-stone-800"
              }`}
              style={{
                background: `${
                  color.color
                    ? color.color
                    : `url(${process.env.NEXT_PUBLIC_SERVER}colors/${color.nameEn}.gif)`
                }`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                bacbackgroundSize: "cover",
                opacity: `${
                  color.isAvailable === true || color.isAvailable === "true"
                    ? "100"
                    : "50"
                }%`,
                cursor:
                  color.isAvailable === true || color.isAvailable === "true"
                    ? "pointer"
                    : "not-allowed",
              }}
            ></button>
          </Tooltip>
        ))}
      </div>
      <label className="text-stone-700 font-bold">انتخاب سایز</label>
      <div className="w-full flex flex-row justify-start items-center gap-2">
        {productInfo.sizes.map((size, index) => (
          <button
            Key={index}
            onClick={() => chooseProductSize(size)}
            type="button"
            className="text-sm font-bold rounded-md py-1.5 px-3"
            style={{
              border: "2px solid #d39d4e",
              background:
                selectedProduct && selectedProduct.size === size
                  ? "#d39d4e"
                  : "#fff",
              color:
                selectedProduct && selectedProduct.size === size
                  ? "#fff"
                  : "#d39d4e",
            }}
          >
            {size}
          </button>
        ))}
      </div>
      <p
        className="text-sm font-bold"
        style={{ color: `${productInfo.isAvailable ? "#d39d4e" : "#b92601"}` }}
      >
        {productInfo.isAvailable ? "موجود در انبار" : "ناموجود"}
      </p>
      <button
        type="submit"
        className="w-full text-white text-xl font-bold rounded-md py-2.5 px-5"
        style={{ background: "#d39d4e" }}
      >
        افزودن به سبد خرید
      </button>
      {productInfo.testAtHome && (
        <>
          <p className="w-full text-center text-sm">یا</p>
          <p className="w-full text-center text-sm">تست رایگان در منزل</p>
          <button
            type="button"
            className="w-full bg-white text-xl rounded-md py-2.5 px-5"
            style={{ color: "#d39d4e", border: "2px solid #d39d4e" }}
          >
            افزودن به سبد تست
          </button>
        </>
      )}
    </form>
  );
};

export default BuyForm;
