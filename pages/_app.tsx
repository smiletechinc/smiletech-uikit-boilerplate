import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { JWTProvider } from '../contexts/JWTContext'
import AuthGuard from '../components/Auth/AuthGuard'
import { Provider } from 'react-redux'
import store from '../store'

function MyApp({ Component, pageProps }: AppProps) {
  return <div className='app-container'>
    <Provider store={store}>
    <JWTProvider >
      <AuthGuard>
  <Component {...pageProps} />
  </AuthGuard>
  </JWTProvider>
  </Provider>
  </div>
}

export default MyApp
