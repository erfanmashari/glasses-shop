import PaymentComponent from "../components/Payment";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Payment = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <PaymentComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Payment;
