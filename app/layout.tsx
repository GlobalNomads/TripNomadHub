import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { QueryProvider } from "./QueryProvider";
import "./styles/globals.css";

const pretendardStd = localFont({
  src: "./assets/fonts/PretendardStdVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-std",
});

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GlobalNomad",
  description:
    "GlobalNomad - 여행을 계획하고 다양한 활동을 쉽게 탐색하세요. Plan your trips and explore various activities with ease.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head />
 <body className={`${pretendardStd.variable} ${inter.variable}`}>
      <AuthProvider>
        <QueryProvider>
          {children}
        </QueryProvider>
      </AuthProvider>
    </body>
    </html>
  );
}
