import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Ryan Jerue",
  description: "Technical blog of Ryan Jerue",
  openGraph: {
    title: "Ryan JErue",
    description: "Technical blog of Ryan Jerue",
    url: baseUrl,
    siteName: "jerue.org",
    locale: "en_US",
    type: "website",
  },
  icons: "/static/favicon.ico",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl lg:max-w-[800px] mx-4 mt-8 lg:mx-auto pb-32 md:pb-64">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
            Ryan Jerue
          </h1>
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}
