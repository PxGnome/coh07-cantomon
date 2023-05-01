
import Layout from '@/components/layout';
import '../styles/customBootstrap.scss';
import '@/styles/globals.scss';

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
