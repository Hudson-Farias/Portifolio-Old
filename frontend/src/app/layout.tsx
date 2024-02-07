import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "../styles/globals.css";
import '@radix-ui/themes/styles.css';

import { Theme } from '@radix-ui/themes'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hudson Farias",
  description: "Software developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          {children}
          <Analytics />
          <SpeedInsights />
        </Theme>
      </body>
    </html>
  );
}
