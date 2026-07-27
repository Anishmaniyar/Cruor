import HospitalDashboardHeader from "@/components/hospital/HospitalDashboardHeader";
import AttentionRequired from "@/components/hospital/AttentionRequired";
import HospitalKpiSection from "@/components/hospital/HospitalKpiSection";
import TodaysAppointments from "@/components/hospital/TodaysAppointments";
import ActiveCampaigns from "@/components/hospital/ActiveCampaigns";
import InventoryOverview from "@/components/hospital/InventoryOverview";
import PendingBloodRequests from "@/components/hospital/PendingBloodRequests";

export default function HospitalDashboardPage() {
  return (
    <main className="min-h-screen space-y-6 p-6 lg:p-8">
      <HospitalDashboardHeader />

      <AttentionRequired />

      <HospitalKpiSection />

      <TodaysAppointments />

      <ActiveCampaigns />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <InventoryOverview />
        <PendingBloodRequests />
      </div>
    </main>
  );
}
