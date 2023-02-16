import Image from "next/image";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const CartItem = ({ isLast, product }) => {
  let imageSource = `http://localhost:8000/products/${product.image.fileName}.jpg`;

  const dateOfNow = new Date();
  const dateOfDiscountTime = product.discountTime
    ? new Date(product.discountTime)
    : dateOfNow;

  return (
    <div
      className="w-full flex flex-row justify-between items-center gap-4 p-2"
      style={{
        height: "160px",
        borderBottom: isLast ? "" : "2px solid #dbdddc",
      }}
    >
      <div className="flex flex-row gap-3">
        <div className="relative" style={{ width: "160px", height: "120px" }}>
          <Image
            fill
            src={imageSource}
            alt="product-image"
            style={{ border: "2px solid #c3c4c3" }}
            className="rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col justify-between items-start">
          <h3 className="text-stone-900 font-bold text-xl">{product.nameFa}</h3>
          <div className="flex flex-row gap-2">
            <span>رنگ: {product.frameColor.nameFa}</span>
            <span>سایز: {product.size}</span>
          </div>
          {!product.discountPercent &&
          !product.discountedPrice &&
          !product.discountTime &&
          product.discountTime &&
          dateOfNow < dateOfDiscountTime ? (
            <div className="flex flex-row gap-2">
              <span className="text-stone-400 font-bold line-through">
                {product.price}
              </span>
              <span className="text-stone-600 font-bold">
                {product.discountedPrice}
              </span>
            </div>
          ) : (
            <span className="text-stone-400 font-bold">{product.price}</span>
          )}
        </div>
      </div>
      <div className="h-full flex justify-center items-center ml-12">
        <button
          style={{ border: "2px solid #c3c4c3" }}
          className="rounded-lg p-0.5"
        >
          <DeleteOutlineIcon className="w-7 h-7 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
