"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  UserPlus,
  CalendarCheck,
  Droplets,
  PackageCheck,
  Heart,
} from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your account as a donor or hospital.",
  },
  {
    icon: CalendarCheck,
    title: "Book or Join",
    description: "Schedule an appointment or join a campaign.",
  },
  {
    icon: Droplets,
    title: "Donate Blood",
    description: "Visit the hospital and complete your donation.",
  },
  {
    icon: PackageCheck,
    title: "Inventory Updated",
    description: "Blood is added to the hospital's inventory system.",
  },
  {
    icon: Heart,
    title: "Lives Saved",
    description: "Blood reaches patients in need across hospitals.",
  },
];

export default function HowItWorks() {
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
      id="how-it-works"
      ref={ref}
      className="relative py-32 border-t border-border bg-surface-secondary"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className={cn(
              "text-3xl sm:text-4xl font-normal tracking-tight text-text-primary transition-all duration-700",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            How Vital Drops Works
          </h2>
          <p
            className={cn(
              "mt-4 text-lg text-text-secondary max-w-2xl mx-auto transition-all duration-700 delay-150",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            A simple, streamlined process from registration to saving lives.
          </p>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden md:relative md:flex md:items-start md:justify-between md:gap-8">
          {/* Continuous connector line behind the steps — circles naturally cover it with their bg-surface */}
          <div className="absolute top-7 inset-x-0 h-px bg-border" />

          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "flex flex-col items-center text-center flex-1 relative z-10 transition-all duration-700",
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step Number Circle */}
              <div className="relative flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface mb-6 group transition-all duration-200 hover:border-primary/50 hover:bg-primary/5">
                <step.icon className="h-6 w-6 text-text-secondary transition-colors duration-300 group-hover:text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-base font-medium text-text-primary mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-text-muted max-w-[200px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Vertical Layout */}
        <div className="md:hidden relative">
          {/* Vertical line */}
          <div className="absolute left-7 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "relative flex items-start gap-6 pl-16 transition-all duration-500",
                  visible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Step number */}
                <div className="absolute left-4 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-xs font-bold text-text-muted">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface">
                  <step.icon className="h-5 w-5 text-text-secondary" />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-base font-medium text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
