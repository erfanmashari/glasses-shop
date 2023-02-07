import ProductSpecification from "./ProductSpecification";

const ProductInfo = () => {
  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      <h4 className="w-fit text-black text-xl font-bold border-b-2 border-black pb-1">
        توضیحات
      </h4>
      <p style={{ color: "#23254e" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
        repellat repellendus omnis sed numquam porro at iste, molestias beatae
        rem suscipit ipsum voluptatem impedit cumque praesentium earum
        dignissimos nesciunt ipsam.
      </p>
      <h4 className="w-fit text-black text-xl font-bold border-b-2 border-black pb-1">
        مشخصات
      </h4>
      <ul className="w-full flex flex-col justify-start items-start gap-2.5">
        <ProductSpecification label={"ابعاد"} value={"10 - 10"} />
        <ProductSpecification label={"ابعاد"} value={"10 - 10"} />
        <ProductSpecification label={"ابعاد"} value={"10 - 10"} />
        <ProductSpecification label={"ابعاد"} value={"10 - 10"} />
      </ul>
      <h4 className="w-fit text-black text-xl font-bold border-b-2 border-black pb-1">
        نظرات
      </h4>
    </div>
  );
};

export default ProductInfo;
