import { PortalSidebar } from "@/components/layout/portal-sidebar";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <PortalSidebar />
      <div className="lg:pl-64">
        <main className="min-h-screen p-4 pt-16 lg:p-8 lg:pt-8">
          <div className="mx-auto max-w-screen-xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
