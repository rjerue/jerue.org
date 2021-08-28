import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="Description"
            content="Website and technical blog of Ryan Jerue, a Software engineer in the United States."
          />
          <meta
            name="keywords"
            content="Ryan Jerue Web Software Engineer React TypeScript"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link rel="apple-touch-icon" href="/static/apple-touch-icon.png" />
          <meta name="apple-mobile-web-app-title" content="Ryan Jerue" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
