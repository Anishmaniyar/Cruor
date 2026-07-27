"use client";

import { useState } from "react";
import AccountSidebar from "@/components/hospital/account/AccountSidebar";
import ProfileInformation from "@/components/hospital/account/ProfileInformation";
import VerificationStatus from "@/components/hospital/account/VerificationStatus";
import SecuritySettings from "@/components/hospital/account/SecuritySettings";
import HospitalInformation from "@/components/hospital/account/HospitalInformation";
import type { AccountSection } from "@/components/hospital/account/AccountSidebar";

const SECTION_MAP: Record<AccountSection, React.FC> = {
  profile: ProfileInformation,
  verification: () => (
    <VerificationStatus isVerified={false} rejectionReason={undefined} />
  ),
  security: SecuritySettings,
  "hospital-info": HospitalInformation,
};

export default function HospitalAccountPage() {
  const [activeSection, setActiveSection] = useState<AccountSection>("profile");
  const ActiveComponent = SECTION_MAP[activeSection];

  return (
    <main className="min-h-screen space-y-6 p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="page-title">Hospital Account</h1>
        <p className="page-description">
          Manage your hospital profile and settings.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left: Sidebar */}
        <div className="w-full shrink-0 lg:w-64">
          <AccountSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        </div>

        {/* Right: Content */}
        <div className="flex-1">
          <ActiveComponent />
        </div>
      </div>
    </main>
  );
}
