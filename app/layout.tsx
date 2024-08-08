import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
