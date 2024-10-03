import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "../components/nav";
import Script from "next/script";

const diatype = localFont({
  src: [
    // { path: "../../fonts/InterVariable.woff2" },
    // {
    //   path: "../../fonts/InterVariable-Italic.woff2",
    //   style: "italic",
    // },
    // {
    //   path: "../../fonts/PretendardVariable.woff2",
    // },
    {
      path: "../../fonts/ABCDiatypeVariableEdu-Regular.woff2",
    },
  ],
  variable: "--font-diatype",
});
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: "Jeeho Ahn",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(diatype.variable, jbmono.variable, " antialiased ")}
    >
      <head>
        <Script
          strategy="beforeInteractive"
          src="https://unpkg.com/dockbar@latest/dockbar.iife.js"
        />
      </head>
      <body>
        {children}
        {/* <Nav /> */}
      </body>
    </html>
  );
}
