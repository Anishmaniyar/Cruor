"use client";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Panel } from "@/components/ui/card";
import { hospitalUser } from "@/lib/mock-data";

export default function HospitalProfilePage() {
  return (
    <>
      <PageHeader label="Settings" title="Hospital settings" description="Manage institution profile and credentials." />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Panel className="lg:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center border-2 border-accent/40 bg-accent/10 text-lg font-semibold text-accent" role="img" aria-label="Hospital avatar">
              NH
            </div>
            <h2 className="mt-4 text-lg font-semibold tracking-tight">{hospitalUser.name}</h2>
            <p className="mt-2 font-mono text-xs text-muted-foreground">{hospitalUser.license}</p>
          </div>
        </Panel>
        <div className="space-y-8 lg:col-span-2">
          <Panel>
            <h3 className="mb-6 border-b border-border pb-4 text-sm font-semibold">Hospital information</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input label="Hospital name" defaultValue={hospitalUser.name} />
              <Input label="Email" type="email" defaultValue={hospitalUser.email} />
              <Input label="Phone" defaultValue={hospitalUser.phone} />
              <Input label="Address" defaultValue={hospitalUser.address} />
              <Input label="License number" defaultValue={hospitalUser.license} readOnly />
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
