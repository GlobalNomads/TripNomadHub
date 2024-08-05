import SideNavCard from "@/components/SideNav/SideNavCard";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full gap-4 xl:gap-6">
      <div className="hidden md:flex md:w-[33.10%]">
        <SideNavCard />
      </div>
      <div className="w-[100%] md:w-[64.83%]">{children}</div>
    </div>
  );
}
