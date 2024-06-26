// src/pages/_document.tsx
import Document, { Html, Head, Main, NextScript } from "next/document";
import RootLayout from "@/components/RootLayout";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="inter">
        <body className="flex flex-1 flex-col">
          <RootLayout>
            <Main />
          </RootLayout>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
