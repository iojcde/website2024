import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Nav from "../components/nav";

const inter = localFont({
  src: [
    // { path: "../fonts/InterVariable.woff2" },
    // {
    //   path: "../fonts/InterVariable-Italic.woff2",
    //   style: "italic",
    // },
    {
      path: "../../fonts/PretendardVariable.woff2",
    },
  ],
  variable: "--font-pt",
});
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jbmono",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(inter.variable, jbmono.variable, " antialiased")}
    >
      <body>
        {children} <Nav />
      </body>
    </html>
  );
}