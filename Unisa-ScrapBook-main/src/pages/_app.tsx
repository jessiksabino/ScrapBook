import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'
import Header from '@/components/Header'
import HeaderScrapBook from '@/components/HeaderScrapBook'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <SessionProvider session={pageProps.session}>
        {!pageProps.scrap ?(<Header/>):(<HeaderScrapBook id={pageProps.scrap.id}/>)}
        <Component {...pageProps} />
      </SessionProvider>
    )
}

