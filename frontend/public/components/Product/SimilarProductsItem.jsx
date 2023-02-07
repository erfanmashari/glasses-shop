import Image from "next/image";

const SimilarProductsItem = () => {
  return (
    <li className="w-1/5 h-full flex flex-col justify-start items-start gap-2 p-4">
      <div className="w-full h-3/5 relative">
        <Image fill={true} alt={"product image"} src={"/images/test.jpg"} />
      </div>
      <p className="font-bold">عینک آفتابی مارتیانو Martiano YD1050 C1</p>
      <p className="text-sm">1,190,000 تومان</p>
    </li>
  );
};

export default SimilarProductsItem;
