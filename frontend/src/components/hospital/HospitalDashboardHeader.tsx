"use client";

import { useAuth } from "@/lib/auth-context";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function HospitalDashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="flex flex-col gap-1">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-description">
        {getGreeting()}, {user?.name ?? "Hospital"}. Monitor today&apos;s
        appointments, campaigns, inventory and blood requests.
      </p>
    </header>
  );
}
