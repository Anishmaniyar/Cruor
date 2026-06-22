"use client";

import Link from "next/link";
import { PageHeader, BackLink } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { bloodGroups } from "@/lib/mock-data";

export default function CreateCampaignPage() {
  return (
    <>
      <BackLink href="/hospital/campaigns" />
      <PageHeader label="New Campaign" title="Create Campaign" description="Launch a new blood donation drive." />
      <Card className="max-w-xl">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Input label="Campaign Title" placeholder="Summer Blood Drive 2026" required />
          <Input label="Location" placeholder="Metro General Hospital — Main Lobby" required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Date" type="date" required />
            <Input label="End Date" type="date" required />
          </div>
          <Input label="Total Slots" type="number" placeholder="200" required />
          <Select label="Blood Groups Needed" defaultValue="all">
            <option value="all">All Groups</option>
            {bloodGroups.map((g) => <option key={g} value={g}>{g}</option>)}
          </Select>
          <Textarea label="Description" placeholder="Campaign details and instructions for donors..." />
          <div className="flex gap-3">
            <Button type="submit">Create Campaign</Button>
            <Link href="/hospital/campaigns"><Button variant="secondary">Cancel</Button></Link>
          </div>
        </form>
      </Card>
    </>
  );
}
