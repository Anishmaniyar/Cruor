"use client";

import Link from "next/link";
import { PublicHeader, PublicFooter } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Authentication</p>
            <h1 className="font-serif text-4xl font-black">Sign In</h1>
            <p className="mt-2 font-body text-sm text-muted-foreground">Access your donor or hospital portal</p>
          </div>
          <Card>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <Input label="Email Address" type="email" placeholder="you@example.com" required />
              <Input label="Password" type="password" placeholder="••••••••" required />
              <Button type="submit" className="w-full">Sign In</Button>
            </form>
            <div className="mt-6 border-t border-border pt-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Quick Access (Demo)</p>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/portal/dashboard"><Button variant="secondary" size="sm" className="w-full">Donor Portal</Button></Link>
                <Link href="/hospital/dashboard"><Button variant="secondary" size="sm" className="w-full">Hospital Portal</Button></Link>
              </div>
            </div>
          </Card>
          <p className="mt-6 text-center font-sans text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-accent hover:underline">Register</Link>
          </p>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
