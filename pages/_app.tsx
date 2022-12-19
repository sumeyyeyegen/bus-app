import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import RouteGuard from '../components/RouteGuard'
import { Provider } from 'react-redux';
import store from '../redux/store'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Otobüs Uygulaması</title>
      <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
    </Head>
    <header id='header'>
      <div className="header-row-1"></div>
      
    </header>
    <div className="app-container">
      <div className="container pt-4 pb-4">
        <RouteGuard>
          <Provider store={store}>
          <Component {...pageProps} />
          </Provider>
        </RouteGuard>
      </div>
    </div>
  </>
}
