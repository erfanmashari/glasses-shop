import DeliveryAddressList from "./DeliveryAddressList";
import PaymentMethod from "./PaymentMethod";
import SendingMethod from "./SendingMethod";

import Link from "next/link";

import { useSelector } from "react-redux";

import axios from "axios";
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
      status: "پرداخت نشده",
      paymentMethod: orderInfo.paymentMethod,
      sendingMethod: "پست پیشتاز",
    };
    axiosApp.post("orders", fecthBody).then((response) => {
      const res = checkFetchResponse(response);

      if (res.ok) {
        toastAlert(res.data.message, "success");
        // zarinpalPostRequest();
      } else {
        toastAlert(res.message, "error");
      }
    });
  };

  // end a request to zarinpal for the payment gateway
  const zarinpalPostRequest = (amount, trackingCode) => {
    const fetchBody = {
      merchant_id: "45sw86r3-s777-231s-68ss-ery458964oop",
      amount: 10000,
      callback_url: "http://localhost:3000",
      description: `پرداخت سفارش با کد پیگیری 000000000`,
      metadata: { mobile: personalInfo.phoneNumber, email: personalInfo.email },
    };
    fetch("https://sandbox.zarinpal.com/pg/v4/payment/request.json", {
      method: "POST",
      // url: "https://sandbox.zarinpal.com/pg/v4/payment/request.json",
      headers: new Headers({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE, POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
        "Content-Type": "application/json",
        accept: "application/json",
      }),
      body: JSON.stringify(fetchBody),
    })
      .then((response) => {
        if (response.ok) {
          console.log("response: ", response)
          return response.json();
        }
      })
      .then((res) => {
        console.log("res: ", res);
        // const data = res.data;
        // if (data.code && data.authority) {
        //   location.href = `https://sandbox.zarinpal.com/pg/StartPay/${data.authority}`;
        // }
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
