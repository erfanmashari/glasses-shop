import PasswordComponent from "../components/Profile/Password";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Password = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <PasswordComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Password;
