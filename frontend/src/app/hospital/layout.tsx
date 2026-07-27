import HospitalSidebar from "@/components/hospital/HospitalSidebar";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute userType="hospital" loginHref="/hospital/login">
      <main className="min-h-screen bg-background">
        <div className="flex">
          <HospitalSidebar />

          <section className="flex-1 min-w-0">{children}</section>
        </div>
      </main>
    </ProtectedRoute>
  );
}
