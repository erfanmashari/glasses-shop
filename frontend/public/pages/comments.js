import CommentsComponent from "../components/Profile/Comments";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Comments = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <CommentsComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Comments;
