import Image from "next/image";
import Link from "next/link";

const DiscountedProductsItem = ({ isLast, product }) => {
  let imageSource = "";
  for (const image of product.images) {
    if (image.isCoverImage) {
      imageSource = `http://localhost:8000/products/${image.fileName}.jpg`;
      break;
    }
  }

  return (
    <Link
      href={`product/${product.nameFa}`}
      className={`${
        !isLast && "border-l-2 border-blue-600"
      } w-1/5 h-full relative flex flex-col justify-between items-end cursor-pointer p-2 pb-6`}
    >
      <div className="w-full h-1/2 relative">
        <Image fill={true} alt={"special-offer-image"} src={imageSource} />
      </div>
      <p className="w-full text-right text-sm">{product.nameFa}</p>
      <div className="w-full flex flex-row justify-between items-center mt-1.5">
        <span className="flex justify-center items-center text-sm bg-red-600 text-white rounded-xl pt-0.5 px-1">
          {product.discountPercent}%
        </span>
        <span className="text-sm">{product.discountedPrice}تومان</span>
      </div>
      <p className="text-sm text-stone-400 line-through">
        {product.price}تومان
      </p>
      <div className="w-full flex flex-row justify-between items-center mt-1.5">
        <span className="text-sm">زمان تخفیف:</span>
        <span className="text-sm">{product.discountTime}</span>
      </div>
    </Link>
  );
};

export default DiscountedProductsItem;
