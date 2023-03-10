import ImagesList from "./ImagesList";
import BuyForm from "./BuyForm";
import ProductInfo from "./ProductInfo";
import SimilarProductsList from "./SimilarProductsList";

import { useEffect } from "react";

import { useDispatch } from "react-redux";
import {
  resetNewCommentInfo,
  resetSelectedProductInfo,
} from "../../redux/actions/product";

const Product = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetNewCommentInfo());
    dispatch(resetSelectedProductInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="w-full flex flex-col justify-center items-center p-8">
      <div className="w-full flex flex-row justify-between items-start gap-4">
        <ImagesList />
        <BuyForm />
      </div>
      <ProductInfo />
      <SimilarProductsList />
    </main>
  );
};

export default Product;
