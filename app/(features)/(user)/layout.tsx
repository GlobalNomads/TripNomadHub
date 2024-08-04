import SideNavCard from "@/components/SideNav/SideNavCard";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNavCard />
      {children}
    </>
  );
}
