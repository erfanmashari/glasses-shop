import Image from "next/image";
import Link from "next/link";

const SimilarProductsItem = ({ product }) => {
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
      className="w-1/5 h-full flex flex-col justify-start items-start cursor-pointer gap-2 p-4"
    >
      <div className="w-full h-3/5 relative">
        <Image fill={true} alt={"product image"} src={imageSource} />
      </div>
      <p className="font-bold">{product.nameFa}</p>
      <p className="text-sm font-bold">{product.price} تومان</p>
    </Link>
  );
};

export default SimilarProductsItem;
