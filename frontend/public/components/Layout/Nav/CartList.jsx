import CartItem from "./CartItem";

import { useSelector } from "react-redux";

// import { server } from "../../../config";

const CartList = () => {
  // get product info from redux/reducers/cart/cartList.js
  const cartList = useSelector((state) => state.cartList);

  // get login status from redux/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <div className="w-96 flex flex-col absolute top-0 left-0 border-2 border-gray-200 bg-white rounded-lg z-10 gap-4 p-4">
      <div className="w-full max-h-60 flex flex-col overflow-y-scroll gap-4">
        {cartList.map((item, index) => (
          <CartItem
            key={index}
            index={index}
            name={item.name}
            // image={`${server}media/${item.image}`}
            is_available={item.is_available}
            price={item.price}
          />
        ))}
      </div>
      <button className="w-full text-center text-white text-lg font-bold bg-blue-600 hover:bg-blue-700 rounded-lg py-1.5">
        {isLoggedIn ? "ثبت سفارش" : "ورود و ثبت سفارش"}
      </button>
    </div>
  );
};

export default CartList;
