import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import Footer from "./components/Footer/Footer";
import SearchBar from "./mainpage/_components/SearchBar";
import Banner from "./mainpage/_components/Banner";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Banner />
        <SearchBar/>
        <div>
          <h4> middle </h4>
        </div>
        <Footer />
      </body>
    </html>
  );
}
