"use client";

import { StaggerReveal } from "@/components/shared/motion-wrapper";

export function PortalPageShell({ children }: { children: React.ReactNode }) {
  return <StaggerReveal className="w-full">{children}</StaggerReveal>;
}
