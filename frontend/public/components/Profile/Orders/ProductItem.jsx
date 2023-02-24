import Image from "next/image";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ProductItem = ({ isLast, product }) => {
  let imageSource = `${process.env.NEXT_PUBLIC_SERVER}products/${product.image.fileName}.jpg`;

  const dateOfNow = new Date();
  const dateOfDiscountTime = product.discountTime
    ? new Date(product.discountTime)
    : dateOfNow;

  return (
    <li
      className="w-full flex flex-row justify-between items-center gap-4 p-2"
      style={{
        height: "120px",
        borderBottom: isLast ? "" : "2px solid #dbdddc",
      }}
    >
      <div className="flex flex-row gap-3">
        <div className="relative" style={{ width: "140px", height: "100px" }}>
          <Image
            fill={true}
            src={imageSource}
            alt="product-image"
            style={{ border: "2px solid #c3c4c3" }}
            className="rounded-lg p-2"
          />
        </div>
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-row gap-2">
            <h3 className="text-stone-900 font-bold text-lg">
              {product.nameFa}
            </h3>
            <h3 className="text-stone-900 font-bold text-lg">
              {product.number}x
            </h3>
          </div>
          <div className="flex flex-row gap-2">
            <span>رنگ: {product.frameColor.nameFa}</span>
            <span>سایز: {product.size}</span>
          </div>
          {product.discountPercent &&
          product.discountedPrice &&
          product.discountTime &&
          dateOfNow < dateOfDiscountTime ? (
            <div className="flex flex-row gap-2">
              <span className="text-stone-400 font-bold line-through">
                {product.price} تومان
              </span>
              <span className="text-stone-600 font-bold">
                {product.discountedPrice} تومان
              </span>
            </div>
          ) : (
            <span className="text-stone-400 font-bold">
              {product.price} تومان
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
