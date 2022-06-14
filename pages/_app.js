import { Provider } from 'react-redux';

import Layout from '../components/shared/Layout';
import store from '../utils/store';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
