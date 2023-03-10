import VerifiedComponent from "../../../components/Verified";

import ErrorPage from "next/error";

import { useSelector } from "react-redux";

const Verified = ({ trackingCode }) => {
  // get login status from store/reducers/login/isLoggedIn.js
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    // <>{isLoggedIn ? <VerifiedComponent /> : <ErrorPage statusCode={404} />}</>
    <>
      <VerifiedComponent trackingCode={trackingCode} />
    </>
  );
};

export const getServerSideProps = async (context) => {
  return {
    props: {
      trackingCode: context.params.trackingCode,
    },
  };
};

export default Verified;
