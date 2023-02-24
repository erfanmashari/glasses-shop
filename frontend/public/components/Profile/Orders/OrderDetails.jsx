import OrderDetailsItem from "./OrderDetailsItem";
import ProductItem from "./ProductItem";

import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { changeTransactionInfo } from "../../../redux/actions/payment";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

const OrderDetails = ({ setOrderDetailsDisplay }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // get selected order info from redux/reducers/profile/selectedOrder.js
  const selectedOrder = useSelector((state) => state.selectedOrder);
  const products = selectedOrder.products ? selectedOrder.products : [];

  // set some of transaction fields in redux
  const setTransactionFields = () => {
    dispatch(changeTransactionInfo("order", selectedOrder._id));
    dispatch(changeTransactionInfo("amount", selectedOrder.totalPrice));

    // move user to payment page
    router.push("/payment")
  };

  return (
    <div className="w-full h-screen fixed top-0 right-0 flex justify-center items-center bg-black/10 z-30">
      <div
        className="w-8/12 flex flex-col bg-white rounded-lg overflow-y-scroll gap-4 p-6"
        style={{ maxHeight: "67%" }}
      >
        <div className="w-full flex flex-row justify-between ietms-center border-b-2 border-stone-200 pb-2">
          <h3 className="w-full text-lg font-bold text-stone-900">
            جزئیات سفارش
          </h3>
          <button onClick={() => setOrderDetailsDisplay(false)} type="button">
            <CloseOutlinedIcon />
          </button>
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <OrderDetailsItem
            label={"روش پرداخت"}
            value={selectedOrder.paymentMethod}
          />
          <OrderDetailsItem
            label={"شیوه ارسال"}
            value={selectedOrder.sendingMethod}
          />
          <OrderDetailsItem
            label={"وضعیت سفارش"}
            value={selectedOrder.status}
          />
        </div>
        <div className="w-full flex flex-row justify-center items-center gap-4">
          <OrderDetailsItem
            label={"قیمت کل"}
            value={selectedOrder.totalPrice}
          />
          <OrderDetailsItem
            label={"تاریخ سفارش"}
            value={
              selectedOrder.createdAt
                ? selectedOrder.createdAt.split("T")[0]
                : ""
            }
          />
          <OrderDetailsItem
            label={"کد رهگیری"}
            value={selectedOrder.trackingCode}
          />
        </div>
        <OrderDetailsItem
          label={"آدرس"}
          value={
            selectedOrder.address ? selectedOrder.address.postalAddress : ""
          }
        />
        {selectedOrder.transaction ? (
          <OrderDetailsItem
            label={"تراکنش"}
            value={selectedOrder.transaction}
          />
        ) : (
          ""
        )}
        {/* products list */}
        <p className="w-full text-md font-bold text-stone-600">محصولات</p>
        <ul
          className="w-full flex flex-col justify-center items-center rounded-xl px-4"
          style={{ border: "2px solid #dbdddc" }}
        >
          {products.map((product, index) => (
            <ProductItem
              key={index}
              product={product}
              isLast={products.length === index + 1 ? true : false}
            />
          ))}
        </ul>
        <div className="w-full flex flex-row justify-center items-center gap-4">
          {selectedOrder.status === "جاری" ? (
            <button
              onClick={setTransactionFields}
              className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
              style={{
                background: "inherit",
                color: "#06291D",
                border: "2px solid #06291D",
              }}
            >
              پرداخت سفارش
            </button>
          ) : (
            ""
          )}
          <button
            className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5"
            style={{
              background: "inherit",
              color: "#06291D",
              border: "2px solid #06291D",
            }}
          >
            حذف سفارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
