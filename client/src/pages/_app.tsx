import '@/styles/globals.css'
import { trpc } from '../util/trpc'
import { AppProps } from 'next/app'

export  function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}


export default trpc.withTRPC(MyApp)
