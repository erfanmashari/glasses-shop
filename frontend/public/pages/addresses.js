import AddressesComponent from "../components/Addresses";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Addresses = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <AddressesComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Addresses;
