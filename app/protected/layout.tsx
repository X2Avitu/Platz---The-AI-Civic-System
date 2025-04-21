import Navbar from "@/components/navbar";
import SidebarDemo from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SidebarDemo />
      <div className="">
        {children}
        <Toaster />

      </div>
    </>
  );
}