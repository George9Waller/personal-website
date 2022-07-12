import i18next from "i18next";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang={i18next.language}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png" />
        <link rel="manifest" href="img/favicon/site.webmanifest" />
        <link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#374c80" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="bg-base-300">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
