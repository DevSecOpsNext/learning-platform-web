import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import type { AppProps } from 'next/app'
import { Session } from 'next-auth';
import { SessionProvider } from "next-auth/react"

function WebApp({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <>

      <Head>
        <title>learning platform</title>
      </Head>
      <SessionProvider session={pageProps.session}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </SessionProvider>
    </>
  );
}

export default WebApp;