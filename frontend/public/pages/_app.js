// import components
import Layout from "../components/Layout";

// import redux tools
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

// import styles
import "../styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
