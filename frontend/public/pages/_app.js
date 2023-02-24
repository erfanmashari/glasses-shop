// import components
import Layout from "../components/Layout";

import { ToastContainer } from "react-toastify";

import { useRouter } from "next/router";

// import redux tools
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

// import styles
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <Provider store={store}>
      {router.pathname === "/login" ||
      router.pathname === "/register" ||
      router.pathname === "/payment" ? (
        <>
          <Component {...pageProps} />
          <ToastContainer rtl={true} />
        </>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
