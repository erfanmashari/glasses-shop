import FavouritesComponent from "../components/Profile/Favourites";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Favourites = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <FavouritesComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Favourites;