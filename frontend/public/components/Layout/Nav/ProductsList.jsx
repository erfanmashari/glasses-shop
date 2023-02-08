// import components
import ProductsItem from "./ProductsItem";

import Image from "next/image";
import Link from "next/link";

const ProductsList = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 py-3">
      <Link href={"/"}>
        <Image
          width={60}
          height={60}
          alt="logo"
          src="/images/sudo-orange.png"
        />
      </Link>
      <ul
        className={`flex flex-row justify-center items-center text-sm gap-4`}
        style={{ color: "#4b4b4b" }}
      >
        <ProductsItem name={"عینک طبی"} />
        <ProductsItem name={"عینک کامپیوتر"} />
        <ProductsItem name={"عینک آفتابی"} />
      </ul>
    </div>
  );
};

export default ProductsList;
