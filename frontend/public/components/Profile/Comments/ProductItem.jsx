import Image from "next/image";
import Link from "next/link";

import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const ProductItem = ({ product }) => {
  let imageSource = "";

  for (const img of product.images) {
    if (img.isCoverImage === true || img.isCoverImage === "true") {
      imageSource = `${process.env.NEXT_PUBLIC_SERVER}products/${img.fileName}.jpg`;
      break;
    }
  }

  const dateOfNow = new Date();
  const dateOfDiscountTime = product.discountTime
    ? new Date(product.discountTime)
    : dateOfNow;

  return (
    <li
      className="w-full flex flex-row justify-between items-center gap-4 p-2"
      style={{
        height: "120px",
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
          <h3 className="text-stone-900 font-bold text-lg">{product.nameFa}</h3>
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
      <Link
        href={`/product/${product.nameFa}`}
        className="text-slate-400 text-sm"
      >
        رفتن به صفحه محصول <ArrowBackIosNewRoundedIcon className="w-4 h-4" />
      </Link>
    </li>
  );
};

export default ProductItem;
