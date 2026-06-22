"use client";

import Link from "next/link";
import { PublicHeader, PublicFooter } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { bloodGroups } from "@/lib/mock-data";

export default function RegisterPage() {
  return (
    <>
      <PublicHeader />
      <main className="flex-1 py-16 px-4">
        <div className="mx-auto max-w-lg">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Join VitalDrops</p>
            <h1 className="font-serif text-4xl font-black">Create Account</h1>
            <p className="mt-2 font-body text-sm text-muted-foreground">Register as a donor or hospital administrator</p>
          </div>
          <Card>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <Select label="Account Type" defaultValue="donor">
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
              </Select>
              <Input label="Full Name / Hospital Name" placeholder="Sarah Mitchell" required />
              <Input label="Email Address" type="email" placeholder="you@example.com" required />
              <Input label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" />
              <Select label="Blood Group (Donors)" defaultValue="O+">
                {bloodGroups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Select>
              <Input label="Password" type="password" placeholder="••••••••" required />
              <Input label="Confirm Password" type="password" placeholder="••••••••" required />
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </Card>
          <p className="mt-6 text-center font-sans text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-accent hover:underline">Sign In</Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
