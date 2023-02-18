import NotificationsComponent from "../components/Profile/Notifications";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Notifications = () => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>{isLoggedIn ? <NotificationsComponent /> : <ErrorPage statusCode={404} />}</>
  );
};

export default Notifications;
