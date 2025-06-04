// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v20.0"
          nonce="your_nonce"
        ></script>  
        {/* Các meta tag toàn cục chung */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

