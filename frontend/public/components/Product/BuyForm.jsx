import Image from "next/image";

import { useSelector } from "react-redux";

import { Tooltip } from "flowbite-react";

const BuyForm = () => {
  const productInfo = useSelector((state) => state.productInfo);

  return (
    <form
      className="w-1/3 flex flex-col justify-start items-start gap-3 p-4"
      style={{ background: "#f8f8f8" }}
    >
      <span className="text-sm" style={{ color: "#6e6e6e" }}>
        خانه / {productInfo.category}
      </span>
      <h2 className="w-full text-lg font-bold">{productInfo.nameFa}</h2>
      <h2 className="w-full text-md border-b-2 border-stone-200 text-stone-500 font-bold pb-2">
        {productInfo.nameEn}
      </h2>
      {productInfo.features.length && (
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
      )}
      <div className="w-full flex flex-row justify-between items-center border-b-2 border-stone-200 pb-2">
        <h4>فروشنده</h4>
        <span className="font-bold">
          {productInfo.frameColors[0].seller.nameFa}
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
            <span className="font-bold">{productInfo.discountTime}</span>
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
              data-tooltip-target="tooltip-default"
              type="button"
              className="w-8 h-8 border-2 border-stone-800"
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
            type="button"
            className="text-white text-sm font-bold rounded-md py-1.5 px-3"
            style={{ background: "#d39d4e" }}
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
