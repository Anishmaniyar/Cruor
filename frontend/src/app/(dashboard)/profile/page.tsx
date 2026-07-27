"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileOverview from "@/components/profile/ProfileOverview";
import PersonalInformation from "@/components/profile/PersonalInformation";
import MedicalInformation from "@/components/profile/MedicalInformation";
import SecuritySettings from "@/components/profile/SecuritySettings";
import NotificationSettings from "@/components/profile/NotificationSettings";
import PrivacySettings from "@/components/profile/PrivacySettings";
import AboutSection from "@/components/profile/AboutSection";
import DeleteAccountCard from "@/components/profile/DeleteAccountCard";

type Section =
  | "profile"
  | "personal"
  | "medical"
  | "security"
  | "notifications"
  | "privacy"
  | "about"
  | "delete";

const SECTION_MAP: Record<Section, React.FC> = {
  profile: ProfileOverview,
  personal: PersonalInformation,
  medical: MedicalInformation,
  security: SecuritySettings,
  notifications: NotificationSettings,
  privacy: PrivacySettings,
  about: AboutSection,
  delete: DeleteAccountCard,
};

export default function ProfilePage() {
  const [activeSection, setActiveSection] = useState<Section>("profile");
  const ActiveComponent = SECTION_MAP[activeSection];

  return (
    <main className="min-h-screen space-y-6 p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="page-title">Profile</h1>
        <p className="page-description">
          Manage your account, medical information and security.
        </p>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Left: Sidebar */}
        <div className="w-full shrink-0 lg:w-64">
          <ProfileSidebar
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
