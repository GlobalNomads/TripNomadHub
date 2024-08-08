import Footer from "@footer/Footer";
import Header from "@header/Header";

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="main-layout">{children}</main>
      <Footer />
    </>
  );
}
