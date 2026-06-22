"use client";

import Link from "next/link";
import { PageHeader, BackLink } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { bloodGroups } from "@/lib/mock-data";

export default function CreateRequestPage() {
  return (
    <>
      <BackLink href="/hospital/requests" />
      <PageHeader label="New Request" title="Create Blood Request" description="Submit an urgent or routine blood request to the network." />
      <Card className="max-w-xl">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Select label="Blood Group" defaultValue="O-">
            {bloodGroups.map((g) => <option key={g} value={g}>{g}</option>)}
          </Select>
          <Input label="Units Required" type="number" placeholder="4" required />
          <Select label="Urgency" defaultValue="normal">
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="critical">Critical</option>
          </Select>
          <Input label="Patient Reference (Optional)" placeholder="Patient ID or case number" />
          <Input label="Required By" type="datetime-local" />
          <div className="flex gap-3">
            <Button type="submit">Submit Request</Button>
            <Link href="/hospital/requests"><Button variant="secondary">Cancel</Button></Link>
          </div>
        </form>
      </Card>
    </>
  );
}
