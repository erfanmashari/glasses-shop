import NewestProductsItem from "./NewestProductsItem";

import { useEffect } from "react";

import axios from "axios";
import { checkFetchResponse } from "../../functions";

import { useSelector, useDispatch } from "react-redux";
import { changeProductsListFromBackend } from "../../redux/actions/home";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

const NewestProductsList = ({ categoryFa, categoryEn }) => {
  const dispatch = useDispatch();

  // get discount products from redux/reducers/home/productsList.js
  const productsList = useSelector((state) => state.productsList);

  useEffect(() => {
    // get discount products from backend
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}products/${categoryFa}`)
      .then((response) => {
        const res = checkFetchResponse(response);
        if (res.ok) {
          // set products in productsList reducer
          dispatch(changeProductsListFromBackend(categoryEn, res.data.products));
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="w-full flex flex-col justify-center items-center gap-3 p-8"
      style={{ background: "#EBEBEB" }}
    >
      <div className="w-full flex flex-col justify-center items-center bg-white shadow-lg rounded-lg">
        <header className="w-full flex flex-row justify-between items-center border-b-2 border-gray-300 py-2 px-4">
          <h4 className="text-2xl font-bold text-stone-700 border-r-4 border-stone-700 pr-2">
            {categoryFa}
          </h4>
          <button className="text-lg text-gray-400">
            بیشتر
            <KeyboardArrowLeftOutlinedIcon />
          </button>
        </header>
        <ul className="w-full flex flex-row gap-8" style={{ height: "360px" }}>
        {productsList[categoryEn].map((product, index) => (
          <NewestProductsItem
            key={index}
            product={product}
          />
        ))}
        </ul>
      </div>
    </div>
  );
};

export default NewestProductsList;
