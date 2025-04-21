import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        {children}
      </div>
      <Footer />
    </>
  );
}


// app layout