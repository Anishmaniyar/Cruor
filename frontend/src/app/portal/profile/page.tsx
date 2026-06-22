"use client";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BloodGroupBadge } from "@/components/ui/badge";
import { donorUser } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function DonorProfilePage() {
  return (
    <>
      <PageHeader label="Account" title="My Profile" description="Manage your personal information and account settings." />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center border-2 border-accent bg-accent/10 font-serif text-3xl font-black text-accent">
              {donorUser.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold">{donorUser.name}</h2>
            <BloodGroupBadge group={donorUser.bloodGroup} />
            <p className="mt-4 font-mono text-xs text-muted-foreground">Member since {formatDate(donorUser.memberSince)}</p>
            <p className="font-mono text-xs text-muted-foreground">{donorUser.totalDonations} total donations</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="font-serif text-lg font-bold mb-6 border-b border-border pb-4">Personal Information</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input label="Full Name" defaultValue={donorUser.name} />
                <Input label="Email" type="email" defaultValue={donorUser.email} />
                <Input label="Phone" defaultValue={donorUser.phone} />
                <Input label="Blood Group" defaultValue={donorUser.bloodGroup} readOnly />
              </div>
              <Input label="Address" defaultValue={donorUser.address} />
              <Button type="submit">Save Changes</Button>
            </form>
          </Card>

          <Card>
            <h3 className="font-serif text-lg font-bold mb-6 border-b border-border pb-4">Change Password</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <Button type="submit" variant="secondary">Update Password</Button>
            </form>
          </Card>
        </div>
      </div>
    </>
  );
}
