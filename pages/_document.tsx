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
          <title>Ryan Jerue</title>
          <meta
            name="Description"
            content="Website and technical blog of Ryan Jerue, a Software engineer in Southern California"
          />
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
