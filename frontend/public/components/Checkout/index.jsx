import DeliveryAddressList from "./DeliveryAddressList";
import PaymentMethod from "./PaymentMethod";
import SendingMethod from "./SendingMethod";

import Link from "next/link";

import { useSelector } from "react-redux";

import axiosApp from "../../utils/axiosApp";
import { checkFetchResponse } from "../../functions";

import { toastAlert } from "../../functions";

const Checkout = () => {
  // get order info from redux/reducer/checkout/orderInfo.js
  const orderInfo = useSelector((state) => state.orderInfo);

  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);
  const cartList = personalInfo.cart ? personalInfo.cart : [];

  let totalPrice = 0;
  const dateOfNow = new Date();
  cartList.forEach((product) => {
    const dateOfDiscountTime = product.discountTime
      ? new Date(product.discountTime)
      : dateOfNow;

    if (
      product.discountPercent &&
      product.discountedPrice &&
      product.discountTime &&
      dateOfNow < dateOfDiscountTime
    ) {
      totalPrice += product.discountedPrice;
    } else {
      totalPrice += product.price;
    }
  });

  const addOrder = () => {
    // send add order request to backend
    const productsIds = [];
    cartList.forEach((product) => {
      productsIds.push(product._id);
    });
    const fecthBody = {
      userId: personalInfo._id,
      address: orderInfo.address,
      products: productsIds,
      status: "unpaid",
      paymentMethod: orderInfo.paymentMethod,
      sendingMethod: "express mail",
    };
    axiosApp.post("orders", fecthBody).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok) {
        toastAlert(res.data.message, "success");
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  return (
    <main
      className="w-full flex flex-row justify-center items-start p-12 gap-6"
      style={{ borderBottom: "2px dashed #202020" }}
    >
      <div className="w-9/12 flex flex-col justify-center items-center rounded-xl gap-2 px-4">
        <DeliveryAddressList />
        <PaymentMethod />
        <SendingMethod />
      </div>
      <div
        className="w-3/12 flex flex-col justify-center items-center rounded-xl gap-2 p-4"
        style={{ border: "2px solid #dbdddc" }}
      >
        <h3 className="w-full text-lg font-bold">مجموعه کل سبد خرید</h3>
        <div className="w-full flex flex-row justify-between items-center">
          <span>قیمت کل</span>
          <span>{totalPrice} تومان</span>
        </div>
        <button
          onClick={addOrder}
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ثبت سفارش و پرداخت
        </button>
        <Link className="hidden" href={"/checkout"}></Link>
      </div>
    </main>
  );
};

export default Checkout;
