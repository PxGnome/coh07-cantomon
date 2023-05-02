
import Layout from '@/components/layout';

import store from '@/utils/store';
import { Provider } from "react-redux";

import "bootstrap-icons/font/bootstrap-icons.css";
import '../styles/customBootstrap.scss';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </Provider>
  )
}
