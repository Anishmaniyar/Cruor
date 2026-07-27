"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CampaignInformation from "@/components/hospital/campaigns/CampaignInformation";
import RegistrationSummary from "@/components/hospital/campaigns/RegistrationSummary";
import RegisteredDonorsTable from "@/components/hospital/campaigns/RegisteredDonorsTable";
import CampaignTimeline from "@/components/hospital/campaigns/CampaignTimeline";
import CampaignActions from "@/components/hospital/campaigns/CampaignActions";
import type { CampaignStatus } from "@/components/hospital/campaigns/CampaignStatusBadge";
import type { CampaignDonor } from "@/components/hospital/campaigns/RegisteredDonorsTable";
import type { DonorStatus } from "@/components/hospital/campaigns/CampaignStatusBadge";

interface CampaignData {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: CampaignStatus;
  totalRegistered: number;
  totalCheckedIn: number;
  totalCompleted: number;
  donors: CampaignDonor[];
}

const mockCampaigns: Record<string, CampaignData> = {
  "CAMP-001": {
    name: "Summer Blood Drive",
    description: "Annual summer blood drive campaign to collect blood donations for emergency preparedness. Donors of all blood types are welcome.",
    date: "Aug 20, 2026",
    startTime: "08:00 AM",
    endTime: "04:00 PM",
    location: "City Blood Bank, Pune",
    status: "Active",
    totalRegistered: 24,
    totalCheckedIn: 10,
    totalCompleted: 6,
    donors: [
      { id: "D-001", name: "Ravi Sharma", bloodGroup: "O+", status: "Registered" },
      { id: "D-002", name: "Priya Patel", bloodGroup: "A+", status: "Checked In" },
      { id: "D-003", name: "Amit Singh", bloodGroup: "B+", status: "Donation Completed" },
      { id: "D-004", name: "Sneha Reddy", bloodGroup: "AB+", status: "Registered" },
      { id: "D-005", name: "Vikram Joshi", bloodGroup: "O-", status: "Checked In" },
      { id: "D-006", name: "Ananya Verma", bloodGroup: "A-", status: "Donation Completed" },
      { id: "D-007", name: "Rajesh Kumar", bloodGroup: "B-", status: "No Show" },
    ],
  },
  "CAMP-002": {
    name: "Corporate Donation Camp",
    description: "On-site blood donation camp organized at Tech Park corporate campus for employees.",
    date: "Aug 25, 2026",
    startTime: "09:00 AM",
    endTime: "05:00 PM",
    location: "Tech Park, Mumbai",
    status: "Upcoming",
    totalRegistered: 18,
    totalCheckedIn: 0,
    totalCompleted: 0,
    donors: [
      { id: "D-008", name: "Meera Nair", bloodGroup: "AB-", status: "Registered" },
      { id: "D-009", name: "Sunil Patil", bloodGroup: "O+", status: "Registered" },
    ],
  },
  "CAMP-003": {
    name: "Emergency Blood Drive",
    description: "Emergency blood drive organized in response to increased demand at District Hospital.",
    date: "Sep 01, 2026",
    startTime: "08:00 AM",
    endTime: "03:00 PM",
    location: "District Hospital, Nagpur",
    status: "Upcoming",
    totalRegistered: 12,
    totalCheckedIn: 0,
    totalCompleted: 0,
    donors: [],
  },
  "CAMP-004": {
    name: "Community Health Camp",
    description: "Community health camp providing free health checkups and blood donation services.",
    date: "Jul 15, 2026",
    startTime: "07:00 AM",
    endTime: "06:00 PM",
    location: "Community Center, Delhi",
    status: "Completed",
    totalRegistered: 35,
    totalCheckedIn: 35,
    totalCompleted: 32,
    donors: [],
  },
  "CAMP-005": {
    name: "Annual Blood Drive",
    description: "Annual city-wide blood drive hosted at City Hospital.",
    date: "Jul 10, 2026",
    startTime: "08:00 AM",
    endTime: "04:00 PM",
    location: "City Hospital, Bangalore",
    status: "Completed",
    totalRegistered: 42,
    totalCheckedIn: 40,
    totalCompleted: 38,
    donors: [],
  },
  "CAMP-006": {
    name: "College Donation Camp",
    description: "Blood donation camp organized at university campus.",
    date: "Jun 05, 2026",
    startTime: "09:00 AM",
    endTime: "03:00 PM",
    location: "University Campus, Pune",
    status: "Cancelled",
    totalRegistered: 8,
    totalCheckedIn: 0,
    totalCompleted: 0,
    donors: [],
  },
};

export default function CampaignDetailsPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;
  const [campaign, setCampaign] = useState<CampaignData | null>(
    mockCampaigns[campaignId] ?? null
  );

  if (!campaign) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-text-secondary">Campaign not found.</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus: CampaignStatus) => {
    setCampaign((prev) =>
      prev ? { ...prev, status: newStatus } : prev
    );
  };

  const updateDonorStatus = (donorId: string, newStatus: DonorStatus) => {
    setCampaign((prev) => {
      if (!prev) return prev;
      const updatedDonors = prev.donors.map((d) =>
        d.id === donorId ? { ...d, status: newStatus } : d
      );

      const totals = { registered: 0, checkedIn: 0, completed: 0 };
      updatedDonors.forEach((d) => {
        if (d.status === "Registered") totals.registered++;
        else if (d.status === "Checked In") totals.checkedIn++;
        else if (d.status === "Donation Completed") totals.completed++;
      });

      return {
        ...prev,
        donors: updatedDonors,
        totalRegistered: totals.registered + totals.checkedIn + totals.completed,
        totalCheckedIn: totals.checkedIn,
        totalCompleted: totals.completed,
      };
    });
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/campaigns" className="link-action">
        <ArrowLeft size={14} />
        Back to Campaigns
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">{campaign.name}</h1>
        <p className="page-description">
          Manage campaign details, donors, and status.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <CampaignInformation
            campaign={{
              name: campaign.name,
              description: campaign.description,
              date: campaign.date,
              startTime: campaign.startTime,
              endTime: campaign.endTime,
              location: campaign.location,
              status: campaign.status,
            }}
          />

          <RegistrationSummary
            totalRegistered={campaign.totalRegistered}
            totalCheckedIn={campaign.totalCheckedIn}
            totalCompleted={campaign.totalCompleted}
          />

          <RegisteredDonorsTable
            donors={campaign.donors}
            onCheckIn={(id) => updateDonorStatus(id, "Checked In")}
            onComplete={(id) => updateDonorStatus(id, "Donation Completed")}
            onNoShow={(id) => updateDonorStatus(id, "No Show")}
          />

          <CampaignActions
            campaignId={campaignId}
            status={campaign.status}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Right Column */}
        <div>
          <CampaignTimeline status={campaign.status} />
        </div>
      </div>
    </div>
  );
}
