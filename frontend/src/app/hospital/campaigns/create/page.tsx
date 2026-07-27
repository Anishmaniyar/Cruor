import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CreateCampaignForm from "@/components/hospital/campaigns/CreateCampaignForm";

export default function CreateCampaignPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/campaigns" className="link-action">
        <ArrowLeft size={14} />
        Back to Campaigns
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">Create Campaign</h1>
        <p className="page-description">
          Set up a new blood donation campaign for your hospital.
        </p>
      </header>

      <CreateCampaignForm />
    </div>
  );
}
