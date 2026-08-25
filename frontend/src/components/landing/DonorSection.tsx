"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Droplets, Check, Calendar, Users, History, Activity, Bell } from "lucide-react";

const donorBenefits = [
  { icon: Calendar, text: "Book appointments at verified hospitals" },
  { icon: Users, text: "Join donation campaigns near you" },
  { icon: History, text: "Track your complete donation history" },
  { icon: Activity, text: "Check your donation eligibility status" },
  { icon: Bell, text: "Receive reminders for upcoming donations" },
];

export default function DonorSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="donors"
      ref={ref}
      className="relative py-32 border-t border-border bg-surface-secondary"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left - Dashboard Preview */}
          <div
            className={cn(
              "flex-1 w-full max-w-lg transition-all duration-700",
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8",
            )}
          >
            <div className="rounded-xl border border-border bg-surface overflow-hidden">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20">
                    <Droplets className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    Donor Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span className="text-xs text-text-muted">Eligible</span>
                </div>
              </div>

              {/* Mock Stats */}
              <div className="grid grid-cols-3 gap-px bg-border">
                {[
                  { label: "Donations", value: "8" },
                  { label: "Lives Saved", value: "24" },
                  { label: "Campaigns", value: "3" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-surface px-5 py-4 text-center"
                  >
                    <p className="text-lg font-medium text-text-primary">
                      {stat.value}
                    </p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Mock Recent Activity */}
              <div className="p-6 space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Recent Activity
                </p>
                {[
                  {
                    label: "Blood Donation",
                    date: "Mar 15, 2026",
                    status: "Completed",
                  },
                  {
                    label: "Campaign Joined",
                    date: "Mar 10, 2026",
                    status: "Upcoming",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary">
                        {item.label}
                      </p>
                      <p className="text-xs text-text-muted">{item.date}</p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-xs font-medium",
                        item.status === "Completed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning",
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div
            className={cn(
              "flex-1 max-w-lg transition-all duration-700 delay-200",
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8",
            )}
          >
            <h2 className="text-3xl sm:text-4xl font-normal tracking-tight text-text-primary">
              Designed for <span className="text-primary">Blood Donors</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              A seamless experience for donors to manage their entire donation
              journey from registration to post-donation tracking.
            </p>

            {/* Benefits Checklist */}
            <ul className="mt-8 space-y-4">
              {donorBenefits.map((benefit, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-start gap-3 transition-all duration-500",
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-success/10 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-success" />
                  </div>
                  <div className="flex items-center gap-3">
                    <benefit.icon className="h-4 w-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-secondary">
                      {benefit.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Link href="/signup">
                <Button variant="primary" size="default" className="h-12 px-8 text-base">
                  <Droplets className="h-5 w-5" />
                  Become a Donor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
