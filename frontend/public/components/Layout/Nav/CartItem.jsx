import Image from "next/image";

import { useSelector, useDispatch } from "react-redux";

import { removeProductFromCartList } from "../../../redux/actions/cart";

const CartItem = ({ index, name, image, is_available, price }) => {
  const dispatch = useDispatch();

  // get product info from redux/reducers/cart/cartList.js
  const cartList = useSelector((state) => state.cartList);

  // remove product from cart
  const removeProductFromCart = () => {
    dispatch(removeProductFromCartList(index))
  };

  return (
    <div
      className={`w-full flex flex-row justify-start items-start ${
        index + 1 === cartList.length ? "" : "border-b-2"
      } border-gray-200 pb-3`}
    >
      <div className="w-8/12 flex flex-col justify-start items-start gap-2">
        <h2>{name}</h2>
        <p>{is_available ? "موجود است" : "موجود نیست"}</p>
        <p className="text-lg font-bold text-slate-600">{price} تومان</p>
        <button
          onClick={() => removeProductFromCart()}
          className="text-xl font-bold text-red-600"
        >
          حذف محصول از سبد خرید
        </button>
      </div>
      <Image src={image} alt={name} width={120} height={120} />
    </div>
  );
};

export default CartItem;
