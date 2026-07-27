import Sidebar from "@/components/dashboard/Sidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute userType="donor" loginHref="/login">
      <main className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />

          <section className="flex-1">{children}</section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
