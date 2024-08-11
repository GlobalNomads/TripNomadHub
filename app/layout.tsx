import { AuthProvider } from "@/context/AuthContext";
import Header from "@header/Header";
import type { Metadata } from "next";
import { QueryProvider } from "./QueryProvider";
import "./styles/globals.css";

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
      <body>
        <AuthProvider>
          <QueryProvider>
            <Header />
            {children}
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
