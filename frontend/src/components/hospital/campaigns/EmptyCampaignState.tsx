import { Megaphone } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyCampaignState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-box">
        <Megaphone className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No Campaigns Found</h3>
      <p className="empty-state-description">
        Create your first blood donation campaign to begin accepting donor
        registrations.
      </p>
      <Link href="/hospital/campaigns/create">
        <Button variant="primary" className="mt-6 gap-2">
          Create Campaign
        </Button>
      </Link>
    </div>
  );
}
