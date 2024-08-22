import Header from "@header/Header";
import type { Metadata } from "next";
import ClientOnlyComponent from "./ClientOnlyComponent";
import { getLoginStatus } from "./lib/auth";
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
  const loginStatus = getLoginStatus();

  return (
    <html lang="ko">
      <head />
      <body>
        <QueryProvider>
          <Header loginStatus={loginStatus} />
          <ClientOnlyComponent>{children}</ClientOnlyComponent>
        </QueryProvider>
      </body>
    </html>
  );
}
