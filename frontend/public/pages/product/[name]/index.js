import ProductComponent from "../../../components/Product";

import { useDispatch } from "react-redux";

import { changeProductPageInfoFromBackend } from "../../../redux/actions/product";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  // set product info to redux
  dispatch(changeProductPageInfoFromBackend(product))
  
  return (
    <>
      <ProductComponent />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}products/single/${context.params.name}/`);
  const json = await res.json();

  return {
    props: {
      product: json.status === 200 ? json.data.product : {},
    },
  };
};

export default Product;
