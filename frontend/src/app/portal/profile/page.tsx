"use client";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { BloodGroupBadge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/card";
import { donorUser } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function DonorProfilePage() {
  return (
    <>
      <PageHeader label="Settings" title="Account settings" description="Update profile details and credentials." />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Panel className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div
              className="flex h-20 w-20 items-center justify-center border-2 border-accent/40 bg-accent/10 text-lg font-semibold text-accent"
              role="img"
              aria-label={`Avatar for ${donorUser.name}`}
            >
              {donorUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="mt-4 text-lg font-semibold tracking-tight">{donorUser.name}</h2>
            <BloodGroupBadge group={donorUser.bloodGroup} />
            <p className="mt-4 font-mono text-xs text-muted-foreground">Member since {formatDate(donorUser.memberSince)}</p>
          </div>
        </Panel>

        <div className="space-y-8 lg:col-span-2">
          <Panel>
            <h3 className="mb-6 border-b border-border pb-4 text-sm font-semibold">Personal information</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Full name" defaultValue={donorUser.name} />
                <Input label="Email" type="email" defaultValue={donorUser.email} />
                <Input label="Phone" defaultValue={donorUser.phone} />
                <Input label="Blood group" defaultValue={donorUser.bloodGroup} readOnly />
              </div>
              <Input label="Address" defaultValue={donorUser.address} />
              <Button type="submit">Save changes</Button>
            </form>
          </Panel>

          <Panel>
            <h3 className="mb-6 border-b border-border pb-4 text-sm font-semibold">Change password</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Current password" type="password" />
              <Input label="New password" type="password" />
              <Input label="Confirm new password" type="password" />
              <Button type="submit" variant="secondary">Update password</Button>
            </form>
          </Panel>
        </div>
      </div>
    </>
  );
}
