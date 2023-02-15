import CartItem from "./CartItem";

const Cart = () => {
  return (
    <main
      className="w-full flex justify-center items-center p-12"
      style={{ borderBottom: "2px dashed #202020" }}
    >
      <form
        className="w-full flex flex-col justify-center items-center rounded-xl gap-2 px-4"
        style={{ border: "2px solid #dbdddc" }}
      >
        <CartItem />
        <CartItem isLast={true} />
      </form>
    </main>
  );
};

export default Cart;
