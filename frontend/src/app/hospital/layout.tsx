import HospitalSidebar from "@/components/hospital/HospitalSidebar";

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex">
        <HospitalSidebar />

        <section className="flex-1 min-w-0">{children}</section>
      </div>
    </main>
  );
}
