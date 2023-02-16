import CartItem from "./CartItem";

import Link from "next/link";

import { useSelector } from "react-redux";

const Cart = () => {
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

  return (
    <main
      className="w-full flex flex-row justify-center items-start p-12 gap-6"
      style={{ borderBottom: "2px dashed #202020" }}
    >
      <ul
        className="w-9/12 flex flex-col justify-center items-center rounded-xl gap-2 px-4"
        style={{ border: "2px solid #dbdddc" }}
      >
        {cartList.map((product, index) => (
          <CartItem
            key={index}
            product={product}
            isLast={personalInfo.cart.length === index + 1 ? true : false}
          />
        ))}
      </ul>
      <div
        className="w-3/12 flex flex-col justify-center items-center rounded-xl gap-2 p-4"
        style={{ border: "2px solid #dbdddc" }}
      >
        <h3 className="w-full text-lg font-bold">مجموعه کل سبد خرید</h3>
        <div className="w-full flex flex-row justify-between items-center">
          <span>قیمت کل</span>
          <span>{totalPrice} تومان</span>
        </div>
        <Link
          href={"/checkout"}
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ادامه خرید
        </Link>
      </div>
    </main>
  );
};

export default Cart;
