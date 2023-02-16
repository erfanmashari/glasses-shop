import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = () => {
  // get personal info from redux/reducer/profile/personalInfo.js
  const personalInfo = useSelector((state) => state.personalInfo);
  const cartList = personalInfo.cart ? personalInfo.cart : [];

  return (
    <main
      className="w-full flex justify-center items-center p-12"
      style={{ borderBottom: "2px dashed #202020" }}
    >
      <form
        className="w-full flex flex-col justify-center items-center rounded-xl gap-2 px-4"
        style={{ border: "2px solid #dbdddc" }}
      >
        {cartList.map((product, index) => (
          <CartItem
            key={index}
            product={product}
            isLast={personalInfo.cart.length === index + 1 ? true : false}
          />
        ))}
        <button
          type="submit"
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4 mb-8"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ادامه خرید
        </button>
      </form>
    </main>
  );
};

export default Cart;
