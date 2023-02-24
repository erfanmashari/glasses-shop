import Link from "next/link";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { changeTransactionInfo } from "../../redux/actions/payment";

import axiosApp from "../../utils/axiosApp";
import { checkFetchResponse, toastAlert } from "../../functions";

// import Countdown from "react-countdown";

const PaymentForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);

  // get transaction info from redux/reducers/payment/transactionInfo.js
  const transactionInfo = useSelector((state) => state.transactionInfo);

  // get now date for counter
  // const date = new Date();

  // change input value in transaction info
  const changeInputValue = (parameter, value) => {
    dispatch(changeTransactionInfo(parameter, value));
  };

  // submit transaction and send info to backend
  const submitTransaction = (e) => {
    e.preventDefault();

    const fetchBody = { ...transactionInfo };
    fetchBody.user = personalInfo._id;
    axiosApp.post("transactions", fetchBody).then((response) => {
      const res = checkFetchResponse(response);
      if (res.ok) {
        toastAlert(res.data.message, "success");
        router.push("/");
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  return (
    <form
      onSubmit={submitTransaction}
      className="w-7/12 flex flex-col gap-4 p-10"
    >
      <div className="w-full flex flex-row justify-between items-center">
        <h3
          className="flex flex-row items-center text-lg font-semibold gap-2"
          style={{ color: "#464749" }}
        >
          اطلاعات کارت شما
        </h3>
        {/* <span className="font-semibold" style={{ color: "rgb(175, 175, 177)" }}>
          <Countdown date={date.getTime() + 15 * 60 * 1000} autoStart={true} />
        </span> */}
      </div>
      {/* inputs */}
      <div className="w-full flex flex-row justify-center items-center">
        <label className="w-4/12">شماره کارت</label>
        <input
          dir="ltr"
          type="text"
          required={true}
          value={transactionInfo["card"] ? transactionInfo["card"] : ""}
          onChange={(e) => changeInputValue("card", e.target.value)}
          className="w-8/12 text-center rounded-lg py-1.5 px-3"
        />
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <label className="w-4/12">کد CVV2</label>
        <input
          dir="ltr"
          type="text"
          required={true}
          value={transactionInfo["cvv2"] ? transactionInfo["cvv2"] : ""}
          onChange={(e) => changeInputValue("cvv2", e.target.value)}
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
          value={
            transactionInfo["expireMonth"] ? transactionInfo["expireMonth"] : ""
          }
          onChange={(e) => changeInputValue("expireMonth", e.target.value)}
          className="w-3/12 text-center rounded-lg py-1.5 px-3"
        />
        <input
          dir="ltr"
          type="text"
          placeholder="سال"
          required={true}
          value={
            transactionInfo["expireYear"] ? transactionInfo["expireYear"] : ""
          }
          onChange={(e) => changeInputValue("expireYear", e.target.value)}
          className="w-3/12 text-center rounded-lg py-1.5 px-3 mr-3"
        />
      </div>
      <div className="w-full flex flex-row justify-center items-center">
        <label className="w-4/12">رمز اینترنتی(رمز دوم)</label>
        <input
          dir="ltr"
          type="text"
          required={true}
          value={
            transactionInfo["secondPassword"]
              ? transactionInfo["secondPassword"]
              : ""
          }
          onChange={(e) => changeInputValue("secondPassword", e.target.value)}
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
        <Link
          href={"/"}
          className="w-6/12 h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          انصراف
        </Link>
      </div>
    </form>
  );
};

export default PaymentForm;
