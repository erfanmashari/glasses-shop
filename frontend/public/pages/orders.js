import OrdersComponent from "../components/Profile/Orders";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Orders = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <OrdersComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Orders;
