import "../styles/main.css";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { SessionProvider } from "next-auth/react";
import AppContextProvider from "../components/context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MuiThemeWrapper from "../components/common/MuiThemeWrapper";
config.autoAddCss = false;

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <div style={{ overflowX: 'hidden'}}>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-J9SNYSBDED"
      />
      <Script async type="text/javascript" src="/googleAnalytics.js" />
      <SessionProvider>
        <ThemeProvider>
          <MuiThemeWrapper>
            <AppContextProvider>
              <ToastContainer />
              {getLayout(<Component {...pageProps} />)}
            </AppContextProvider>
          </MuiThemeWrapper>
        </ThemeProvider>
      </SessionProvider>
    </div>
  );
}
