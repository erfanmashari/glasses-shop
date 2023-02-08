import SimilarProductsItem from "./SimilarProductsItem";

import { useEffect } from "react";

import axios from "axios";
import { checkFetchResponse } from "../../functions";

import { useSelector, useDispatch } from "react-redux";
import { changeSimilarProductFromBackend } from "../../redux/actions/product";

const SimilarProductsList = () => {
  const dispatch = useDispatch();

  // get discount products from redux/reducers/product/productInfo.js
  const productInfo = useSelector((state) => state.productInfo);

  // get discount products from redux/reducers/product/similarProducts.js
  const similarProducts = useSelector((state) => state.similarProducts);

  useEffect(() => {
    // get discount products from backend
    console.log("test: ", `${process.env.NEXT_PUBLIC_SERVER}products/${productInfo.category}`)
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}products/${productInfo.category}`)
      .then((response) => {
        const res = checkFetchResponse(response);

        if (res.ok) {
          // set products in productsList reducer
          dispatch(changeSimilarProductFromBackend(res.data.products));
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="w-full flex flex-col justify-start items-start rounded-xl gap-4 p-8 mt-8"
      style={{ background: "#e5e5e5" }}
    >
      <h2 className="text-xl font-bold">محصولات مشابه</h2>
      <ul className="w-full flex flex-row justify-start items-center bg-white rounded-lg" style={{ height: "240px" }}>
        {similarProducts.map((product, index) => (
          productInfo._id !== product._id && 
          <SimilarProductsItem
            key={index}
            product={product}
          />
        ))}
      </ul>
    </div>
  );
};

export default SimilarProductsList;
