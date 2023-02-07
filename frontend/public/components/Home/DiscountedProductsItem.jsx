import Image from "next/image";

const DiscountedProductsItem = ({ isLast }) => {
  return (
    <li className={`${!isLast && "border-l-2 border-blue-600"} w-3/12 h-full relative flex flex-col justify-between items-end cursor-pointer p-2 pb-6`}>
      <div className="w-full h-1/2 relative">
        <Image
          fill={true}
          alt={"special-offer-image"}
          src={"/images/test.jpg"}
        />
      </div>
      <p className="w-full text-right text-sm">عینک آفتابی مارتیانو Martiano YD1050 C1</p>
      <div className="w-full flex flex-row justify-between items-center mt-1.5">
        <span className="flex justify-center items-center text-sm bg-red-600 text-white rounded-xl pt-0.5 px-1">12%</span>
        <span className="text-sm">1,190,000تومان</span>
      </div>
      <p className="text-sm text-stone-400 line-through">1,600,000تومان</p>
    </li>
  );
};

export default DiscountedProductsItem;
