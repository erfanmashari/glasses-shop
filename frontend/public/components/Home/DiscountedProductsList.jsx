import DiscountedProductsItem from "./DiscountedProductsItem";

import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const DiscountedProductsList = () => {
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
        <DiscountedProductsItem />
        <DiscountedProductsItem />
        <DiscountedProductsItem />
        <DiscountedProductsItem />
        <DiscountedProductsItem isLast={true} />
      </ul>
    </div>
  );
};

export default DiscountedProductsList;
