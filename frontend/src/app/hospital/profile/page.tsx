"use client";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { hospitalUser } from "@/lib/mock-data";

export default function HospitalProfilePage() {
  return (
    <>
      <PageHeader label="Institution" title="Hospital Profile" description="Manage hospital information and account settings." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center border-2 border-accent bg-accent/10 font-serif text-2xl font-black text-accent">
              MG
            </div>
            <h2 className="mt-4 font-serif text-xl font-bold">{hospitalUser.name}</h2>
            <p className="font-mono text-xs text-muted-foreground mt-1">{hospitalUser.license}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <h3 className="font-serif text-lg font-bold mb-6 border-b border-border pb-4">Hospital Information</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Hospital Name" defaultValue={hospitalUser.name} />
              <Input label="Email" type="email" defaultValue={hospitalUser.email} />
              <Input label="Phone" defaultValue={hospitalUser.phone} />
              <Input label="Address" defaultValue={hospitalUser.address} />
              <Input label="License Number" defaultValue={hospitalUser.license} readOnly />
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
