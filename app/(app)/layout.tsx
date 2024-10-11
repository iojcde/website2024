import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { TooltipProvider } from "@/components/ui/tooltip";

import dynamic from "next/dynamic";
import Nav from "../components/nav";

const diatype = localFont({
  src: [
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

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        diatype.variable,
        jbmono.variable,
        newsreader.variable,
        " antialiased dark"
      )}
    >
      <head>
        <Script
          strategy="afterInteractive"
          src="https://unpkg.com/dockbar@latest/dockbar.iife.js"
        />
      </head>
      <body>
        <TooltipProvider>
          {children}
          <Nav />
        </TooltipProvider>
      </body>
    </html>
  );
}
