import Drawer from "../Drawer";
import OrdersList from "./OrdersList";
import OrderDetails from "./OrderDetails";

import { useState } from "react";

const Orders = () => {
  // display order details status
  const [orderDetailsDisplay, setOrderDetailsDisplay] = useState(false);

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
