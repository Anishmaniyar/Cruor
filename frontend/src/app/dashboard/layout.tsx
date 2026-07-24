import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-backgorund">
      <div className="flex">
        <Sidebar />

        <section className="flex-1">{children}</section>
      </div>
    </main>
  );
}
