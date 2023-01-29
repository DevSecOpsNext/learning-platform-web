import Head from 'next/head';
import 'tailwindcss/tailwind.css';
import DashboardLayout from '../dashboard/layout';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps } : AppProps) {
  return (
    <>
      <Head>
        <title>learning platform</title>
      </Head>
      <DashboardLayout>
        <Component {...pageProps} />
      </DashboardLayout>
    </>
  );
}

export default MyApp;
