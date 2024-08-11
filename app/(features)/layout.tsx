import Footer from "@footer/Footer";

export default function FeaturesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="main-layout">{children}</main>
      <Footer />
    </>
  );
}
