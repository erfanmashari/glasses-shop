import Image from "next/image";
import Link from "next/link";

const NewestProductsItem = ({ product }) => {
  let imageSource = "";
  for (const image of product.images) {
    if (image.isCoverImage) {
      imageSource = `http://localhost:8000/products/${image.fileName}.jpg`;
      break;
    }
  }

  return (
    <li className="w-1/4 flex flex-col justify-center items-center">
      <Link
        href={`product/${product.nameFa}`}
        className="w-full flex flex-col justify-center items-center cursor-pointer"
      >
        <header className="w-full text-center text-black font-bold text-lg border-b-2 pb-1">
          {product.nameFa}
        </header>
        <div className="w-full relative" style={{ height: "200px" }}>
          <Image fill={true} alt={"newest-product-image"} src={imageSource} />
        </div>
        <p className="font-bold">{product.price} تومان</p>
      </Link>
      <button className="border-b-2 py-1.5 px-3 mt-2 hover:border-blue-600">
        افزودن به سبد خرید
      </button>
    </li>
  );
};

export default NewestProductsItem;
