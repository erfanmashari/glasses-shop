import React from "react";

const BuyForm = () => {
  return (
    <form
      className="w-1/3 flex flex-col justify-start items-start gap-3 p-4"
      style={{ background: "#f8f8f8" }}
    >
      <span className="text-sm" style={{ color: "#6e6e6e" }}>
        خانه / عینک طبی
      </span>
      <h2 className="w-full text-lg border-b-2 border-stone-200 font-bold pb-2">
        عینک آفتابی مارتیانو Martiano YD1050 C1
      </h2>
      <div className="w-full flex flex-row justify-between items-center border-b-2 border-stone-200 pb-2">
        <h4>مارتیانو</h4>
        <span className="font-bold">1,190,000 تومان</span>
      </div>
      <label className="text-stone-700 font-bold">انتخاب رنگ</label>
      <div className="w-full flex flex-row justify-start items-center">
        <button
          className="w-8 h-8 border-2 border-stone-800"
          style={{ background: "#c0c0c0" }}
        ></button>
      </div>
      <label className="text-stone-700 font-bold">انتخاب سایز</label>
      <div className="w-full flex flex-row justify-start items-center">
        <button
          className="text-white text-sm font-bold rounded-md py-1.5 px-3"
          style={{ background: "#d39d4e" }}
        >
          کوچک
        </button>
      </div>
      <p className="text-sm font-bold" style={{ color: "#d39d4e" }}>
        موجود در انبار
      </p>
      <button
        className="w-full text-white text-xl font-bold rounded-md py-2.5 px-5"
        style={{ background: "#d39d4e" }}
      >
        افزودن به سبد خرید
      </button>
      <p className="w-full text-center text-sm">یا</p>
      <p className="w-full text-center text-sm">تست رایگان در منزل</p>
      <button
        className="w-full bg-white text-xl rounded-md py-2.5 px-5"
        style={{ color: "#d39d4e", border: "2px solid #d39d4e" }}
      >
        افزودن به سبد تست
      </button>
    </form>
  );
};

export default BuyForm;
