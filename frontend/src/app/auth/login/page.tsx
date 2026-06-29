"use client";

import Link from "next/link";
import { PublicHeader, PublicFooter } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <>
      <PublicHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">Authentication</p>
            <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
            <p className="mt-2 text-sm text-muted-foreground">Access donor or hospital workflows.</p>
          </div>
          <div className="border border-border p-6">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <Input label="Email address" type="email" id="email" placeholder="you@example.com" required />
              <Input label="Password" type="password" id="password" placeholder="Enter password" required helperText="Minimum 8 characters" />
              <Button type="submit" className="w-full">Sign in</Button>
            </form>
            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Demo access</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/portal/dashboard"><Button variant="secondary" size="sm" className="w-full">Donor portal</Button></Link>
                <Link href="/hospital/dashboard"><Button variant="secondary" size="sm" className="w-full">Hospital portal</Button></Link>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account? <Link href="/auth/register" className="text-accent hover:underline">Register</Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
