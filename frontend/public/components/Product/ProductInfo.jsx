import ProductSpecification from "./ProductSpecification";
import AddCommentForm from "./AddCommentForm";
import CommentsList from "./CommentsList";

import { useSelector } from "react-redux";

const ProductInfo = () => {
  const productInfo = useSelector((state) => state.productInfo);

  return (
    <div className="w-full flex flex-col gap-4 mt-6">
      {productInfo.description && (
        <>
          <h4 className="w-fit text-black text-xl font-bold border-b-2 border-black pb-1">
            توضیحات
          </h4>
          <p style={{ color: "#23254e" }}>{productInfo.description}</p>
        </>
      )}
      <h4 className="w-fit text-black text-xl font-bold border-b-2 border-black pb-1">
        مشخصات
      </h4>
      <ul className="w-full flex flex-col justify-start items-start gap-2.5 mr-32">
        <ProductSpecification label={"سایز"} value={productInfo.sizes} />
        <ProductSpecification label={"ابعاد"} value={productInfo.dimensions} />
        <ProductSpecification label={"برند"} value={productInfo.brand.nameFa} />
        <ProductSpecification label={"جنسیت"} value={productInfo.genders} />
        <ProductSpecification
          label={"کشور سازنده"}
          value={productInfo.originCountry}
        />
        <ProductSpecification
          label={"مبدا برند"}
          value={productInfo.brand.origin}
        />
        <ProductSpecification
          label={"نوع رنگ فریم"}
          value={productInfo.frameColorType}
        />
        <ProductSpecification
          label={"نوع فریم"}
          value={productInfo.frameType}
        />
        <ProductSpecification
          label={"شکل فریم"}
          value={productInfo.frameShapes}
        />
        <ProductSpecification
          label={"جنس فریم"}
          value={productInfo.frameMaterial}
        />
        <ProductSpecification
          label={"ویژگی عدسی"}
          value={productInfo.lensFeatures}
        />
        <ProductSpecification
          label={"جنس عدسی"}
          value={productInfo.lensMaterial}
        />
        <ProductSpecification
          label={"رنگ عدسی"}
          value={productInfo.lensColor}
        />
        <ProductSpecification
          label={"رنگ دید عدسی"}
          value={productInfo.lensVisionColor}
        />
        <ProductSpecification
          label={"شکل صورت"}
          value={productInfo.faceShapes}
        />
        <ProductSpecification label={"مدل"} value={productInfo.model} />
      </ul>
      <div className="w-full flex flex-row justify-between items-center">
        <h4 className="w-fit text-black text-xl font-bold border-b-2 border-black pb-1">
          نظرات
        </h4>
        <button
          // onClick={addOrder}
          className="w-max h-fit flex flex-row justify-center items-center text-md font-bold rounded-lg gap-1 px-3 py-1.5 mt-4"
          style={{
            background: "inherit",
            color: "#06291D",
            border: "2px solid #06291D",
          }}
        >
          ثبت نظر
        </button>
      </div>
      <AddCommentForm />
      <CommentsList />
    </div>
  );
};

export default ProductInfo;
