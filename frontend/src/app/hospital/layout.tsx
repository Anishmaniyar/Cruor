import { HospitalSidebar } from "@/components/layout/hospital-sidebar";
import { PortalPageShell } from "@/components/layout/portal-shell";

export default function HospitalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-background">
      <HospitalSidebar />
      <div className="lg:pl-64">
        <main className="min-h-[100dvh] p-4 pt-16 lg:p-8 lg:pt-8">
          <div className="mx-auto max-w-[1400px]">
            <PortalPageShell>{children}</PortalPageShell>
          </div>
        </main>
      </div>
    </div>
  );
}
