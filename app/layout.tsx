// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@/modules/styles/globals.css";
import { ColorSchemeScript } from "@mantine/core";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/modules/common/providers";
import classNames from "classnames";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resturant Check In",
  description: "Resturant Check In",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={classNames(inter.className, "bg-white")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
