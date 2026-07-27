import JourneyTimeline from "@/components/shared/JourneyTimeline";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICard from "@/components/dashboard/KPICard";
import NearbyCampaigns from "@/components/dashboard/NearbyCampaigns";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment";

export default function DashboardPage() {
  return (
    <main className="min-h-screen space-y-6 p-6 lg:p-8">
      <DashboardHeader />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left Column: KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-2">
          <KPICard
            title="Total Donations"
            value="12"
            icon="droplet"
            trend="+2 this month"
          />
          <KPICard
            title="Lives Impacted"
            value="30"
            icon="sparkle"
            trend="+5 this month"
          />
          <KPICard
            title="Next Appointment"
            value="Aug 20"
            icon="calendar"
            subtitle="Saturday, 10:30 AM"
          />
          <KPICard
            title="Eligibility Date"
            value="Aug 10"
            icon="calendarDays"
            subtitle="Can donate again"
          />
        </div>

        {/* Right Column: Upcoming Appointment */}
        <div className="lg:row-span-2">
          <UpcomingAppointment />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NearbyCampaigns />
        </div>
        <div>
          <JourneyTimeline
            stages={["Booked", "Confirmed", "Visited Hospital", "Blood Collected", "Completed"]}
            activeStage="Confirmed"
            title="Appointment Journey"
          />
        </div>
      </div>
    </main>
  );
}
