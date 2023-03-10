import Drawer from "../Drawer";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { resetSelectedOrderInfo } from "../../../redux/actions/profile";

const Orders = () => {
  const dispatch = useDispatch();

  // display order details status
  const [orderDetailsDisplay, setOrderDetailsDisplay] = useState(false);

  useEffect(() => {
    dispatch(resetSelectedOrderInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full flex flex-row justify-center items-start gap-6 p-8">
      <Drawer />
      <OrdersList setOrderDetailsDisplay={setOrderDetailsDisplay} />
      {orderDetailsDisplay ? (
        <OrderDetails setOrderDetailsDisplay={setOrderDetailsDisplay} />
      ) : (
        ""
      )}
    </main>
  );
};

export default Orders;
