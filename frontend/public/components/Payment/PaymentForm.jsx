import Link from "next/link";

import Countdown from "react-countdown";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PaymentForm = () => {
  const date = new Date();

  return (
    <form className="w-7/12 flex flex-col gap-4 p-10">
      <div className="w-full flex flex-row justify-between items-center">
        <h3 className="flex flex-row items-center text-lg font-semibold gap-2" style={{ color: "#464749" }}>
          <Link href={"/"}>
            <ArrowForwardIcon />
          </Link>
          اطلاعات کارت شما
        </h3>
        <span className="font-semibold" style={{ color: "rgb(175, 175, 177)" }}>
          <Countdown date={date.getTime() + 15 * 60 * 1000} autoStart={true} />
        </span>
      </div>
      {/* inputs */}
      <div className="w-full flex flex-row justify-center items-center">
        <label className="w-4/12">شماره کارت</label>
        <input
          dir="ltr"
          type="text"
          required={true}
          className="w-8/12 text-center rounded-lg py-1.5 px-3"
        />
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <label className="w-4/12">کد CVV2</label>
        <input
          dir="ltr"
          type="text"
          required={true}
          className="w-8/12 text-center rounded-lg py-1.5 px-3"
        />
      </div>
      <div className="w-full flex flex-row justify-start items-center">
        <label className="w-4/12">تاریخ انقضای کارت</label>
        <input
          dir="ltr"
          type="text"
          placeholder="ماه"
          required={true}
          className="w-3/12 text-center rounded-lg py-1.5 px-3"
        />
        <input
          dir="ltr"
          type="text"
          placeholder="سال"
          required={true}
          className="w-3/12 text-center rounded-lg py-1.5 px-3 mr-3"
        />
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <label className="w-4/12">رمز اینترنتی(رمز دوم)</label>
        <input
          dir="ltr"
          type="text"
          required={true}
          className="w-8/12 text-center rounded-lg py-1.5 px-3"
        />
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-4 mt-4">
        <button
          type="submit"
          className="w-6/12 h-fit flex flex-row justify-center items-center text-white text-md font-bold rounded-lg gap-1 px-3 py-1.5"
          style={{
            backgroundColor: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          پرداخت
        </button>
        <button
          type="button"
          className="w-6/12 h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          انصراف
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
