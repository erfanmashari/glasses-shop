import SimilarProductsItem from "./SimilarProductsItem";

const SimilarProductsList = () => {
  return (
    <div
      className="w-full flex flex-col justify-start items-start rounded-xl gap-4 p-8 mt-8"
      style={{ background: "#e5e5e5" }}
    >
      <h2 className="text-xl font-bold">محصولات مشابه</h2>
      <ul className="w-full flex flex-row justify-start items-center bg-white rounded-lg" style={{ height: "240px" }}>
        <SimilarProductsItem />
        <SimilarProductsItem />
        <SimilarProductsItem />
        <SimilarProductsItem />
        <SimilarProductsItem />
      </ul>
    </div>
  );
};

export default SimilarProductsList;
