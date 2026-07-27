import { MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const campaigns = [
  {
    id: "1",
    name: "Summer Blood Drive",
    date: "Aug 20, 2026",
    location: "City Blood Bank, Pune",
    registeredDonors: 24,
  },
  {
    id: "2",
    name: "Corporate Donation Camp",
    date: "Aug 25, 2026",
    location: "Tech Park, Mumbai",
    registeredDonors: 18,
  },
  {
    id: "3",
    name: "Emergency Drive",
    date: "Sep 01, 2026",
    location: "District Hospital, Nagpur",
    registeredDonors: 12,
  },
];

export default function ActiveCampaigns() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="section-title">Active Campaigns</h2>
          <p className="section-description">
            Currently running blood donation campaigns.
          </p>
        </div>
        <Link
          href="/hospital/campaigns"
          className="link-action"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="group !p-0 overflow-hidden">
            <div className="p-6">
              <div className="mb-4">
                <Badge variant="success" className="mb-3 text-[10px]">Active</Badge>
                <h3 className="card-title !text-base">{campaign.name}</h3>
              </div>

              <div className="space-y-3">
                <div className="info-row">
                  <Calendar className="info-icon h-3.5 w-3.5" />
                  <span className="text-sm text-text-secondary">{campaign.date}</span>
                </div>
                <div className="info-row">
                  <MapPin className="info-icon h-3.5 w-3.5" />
                  <span className="text-sm text-text-secondary truncate">
                    {campaign.location}
                  </span>
                </div>
                <div className="info-row rounded-lg bg-surface-secondary px-3 py-2">
                  <Users className="h-4 w-4 text-success" />
                  <span className="text-sm text-text-secondary">
                    {campaign.registeredDonors} registered donors
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-border p-4">
              <Link href="/hospital/campaigns">
                <Button variant="secondary" size="sm" className="w-full gap-2">
                  Manage
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
