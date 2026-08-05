"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CalendarClock,
  Megaphone,
  Warehouse,
  Siren,
  ArrowLeftRight,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: CalendarClock,
    title: "Smart Appointment Booking",
    description: "Book blood donation appointments with verified hospitals.",
    color: "#dc2626",
  },
  {
    icon: Megaphone,
    title: "Blood Donation Campaigns",
    description: "Find and join nearby donation campaigns in your area.",
    color: "#f59e0b",
  },
  {
    icon: Warehouse,
    title: "Blood Inventory Management",
    description: "Hospitals can monitor and manage blood stock efficiently.",
    color: "#10b981",
  },
  {
    icon: Siren,
    title: "Emergency Blood Requests",
    description:
      "Hospitals can request blood from other hospitals when inventory is low.",
    color: "#ef4444",
  },
  {
    icon: ArrowLeftRight,
    title: "Hospital Collaboration",
    description:
      "Enable secure hospital-to-hospital blood transfers when needed.",
    color: "#3b82f6",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Verified Platform",
    description:
      "Authentication, verification, and secure access for donors and hospitals.",
    color: "#8b5cf6",
  },
];

export default function Features() {
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
      id="features"
      ref={ref}
      className="relative py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-medium tracking-tight text-text-primary transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Platform Features
          </h2>
          <p
            className={cn(
              "mt-4 text-lg text-text-secondary max-w-2xl mx-auto transition-all duration-700 delay-150",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            Everything you need to streamline blood donation and hospital
            operations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                "group relative rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-border-light hover:shadow-[0_1px_8px_rgba(0,0,0,0.2)] hover:-translate-y-1",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl mb-5 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <feature.icon
                  className="h-6 w-6 transition-colors duration-300"
                  style={{ color: feature.color }}
                />
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
