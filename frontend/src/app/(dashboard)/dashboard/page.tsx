import AppointmentJourney from "@/components/appointments/AppoinmentJourney";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICard from "@/components/dashboard/KPICard";
import NearbyCampaigns from "@/components/dashboard/NearbyCampaigns";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white">Dashboard </h1>
      <DashboardHeader />
      <KPICard />
      <UpcomingAppointment />
      <NearbyCampaigns />
      <AppointmentJourney />
    </div>
  );
}
