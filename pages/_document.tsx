import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            src="https://kit.fontawesome.com/8fb79adcb6.js"
            crossOrigin="anonymous"
          />
          <meta
            name="Description"
            content="Website and technical blog of Ryan Jerue, a Software engineer in Southern California"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          .
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
