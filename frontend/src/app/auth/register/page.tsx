"use client";

import Link from "next/link";
import { PublicHeader, PublicFooter } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { bloodGroups } from "@/lib/mock-data";

export default function RegisterPage() {
  return (
    <>
      <PublicHeader />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-lg">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">Registration</p>
            <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
            <p className="mt-2 text-sm text-muted-foreground">Register as a donor or hospital administrator.</p>
          </div>
          <div className="border border-border p-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <Select label="Account type" defaultValue="donor">
                <option value="donor">Donor</option>
                <option value="hospital">Hospital</option>
              </Select>
              <Input label="Full name or hospital name" placeholder="Priya Venkatesh" required />
              <Input label="Email address" type="email" placeholder="you@example.com" required />
              <Input label="Phone number" type="tel" placeholder="+1 (312) 847-1928" />
              <Select label="Blood group (donors)" defaultValue="O+">
                {bloodGroups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </Select>
              <Input label="Password" type="password" required helperText="Minimum 8 characters" />
              <Input label="Confirm password" type="password" required />
              <Button type="submit" className="w-full">Create account</Button>
            </form>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already registered? <Link href="/auth/login" className="text-accent hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
