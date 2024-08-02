import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
