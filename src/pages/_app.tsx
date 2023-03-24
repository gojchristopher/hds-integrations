import { ThemeProvider } from "@highoutput/hds";
import type { AppProps } from "next/app";
import Head from "next/head";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HDS Example Integration</title>
      </Head>

      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
