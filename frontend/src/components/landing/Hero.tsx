"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CalendarCheck,
  Droplets,
  ShieldCheck,
  ClipboardCheck,
  Building2,
  AlertCircle,
} from "lucide-react";

const trustItems = [
  "Verified Hospitals",
  "Secure Platform",
  "Real-Time Appointments",
];

interface FloatingCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  color: string;
  className?: string;
}

function FloatingCard({
  icon: Icon,
  title,
  subtitle,
  color,
  className,
  style,
}: FloatingCardProps & { style?: React.CSSProperties }) {
  return (
    <div
      className={cn(
        "absolute flex items-center gap-3 rounded-2xl border border-border bg-surface/90 backdrop-blur-sm p-4 shadow-xl animate-float",
        className,
      )}
      style={style}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}20` }}
      >
        <Icon className="h-5 w-5" style={{ color }} />
      </div>
      <div>
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        <p className="text-xs text-text-muted">{subtitle}</p>
      </div>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          {/* Left Column - Content */}
          <div className="flex-1 max-w-xl">
            <div
              className={cn(
                "transition-all duration-700 ease-out",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 mb-8">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-xs font-medium text-text-secondary">
                  Blood Donation Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-text-primary">
                Donate Blood.
                <br />
                <span className="text-primary">Save Lives.</span>
              </h1>

              {/* Description */}
              <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-lg">
                Connecting blood donors and hospitals through one intelligent
                platform. Book appointments, join donation campaigns, and help
                hospitals manage their blood inventory efficiently.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                <Link href="/signup" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="default"
                    className="w-full sm:w-auto h-12 px-8 text-base"
                  >
                    <Droplets className="h-5 w-5" />
                    Become a Donor
                  </Button>
                </Link>
                <Link href="/hospital/login" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="default"
                    className="w-full sm:w-auto h-12 px-8 text-base"
                  >
                    <Building2 className="h-5 w-5" />
                    Hospital Portal
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustItems.map((item, index) => (
                  <div
                    key={item}
                    className={cn(
                      "flex items-center gap-2 transition-all duration-500 ease-out",
                      loaded
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4",
                    )}
                    style={{ transitionDelay: `${400 + index * 150}ms` }}
                  >
                    <ShieldCheck className="h-4 w-4 text-success" />
                    <span className="text-sm text-text-muted">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Floating Cards */}
          <div className="flex-1 relative h-[500px] w-full max-w-lg hidden lg:block">
            <div
              className={cn(
                "transition-all duration-1000 ease-out",
                loaded ? "opacity-100" : "opacity-0",
              )}
            >
              {/* Appointment Card */}
              <FloatingCard
                icon={CalendarCheck}
                title="Upcoming Appointment"
                subtitle="Tomorrow at 10:00 AM"
                color="#dc2626"
                className="top-8 left-0 w-64"
                style={{ animationDelay: "0.2s" }}
              />

              {/* Inventory Card */}
              <FloatingCard
                icon={ClipboardCheck}
                title="Blood Inventory"
                subtitle="A+ : 12 units available"
                color="#10b981"
                className="top-32 right-0 w-64"
                style={{ animationDelay: "0.4s" }}
              />

              {/* Campaign Card */}
              <FloatingCard
                icon={AlertCircle}
                title="Active Campaign"
                subtitle="City Blood Drive - 3 days left"
                color="#f59e0b"
                className="bottom-32 left-8 w-64"
                style={{ animationDelay: "0.6s" }}
              />

              {/* Verified Badge Card */}
              <FloatingCard
                icon={Building2}
                title="City General Hospital"
                subtitle="Verified Partner"
                color="#3b82f6"
                className="bottom-8 right-8 w-64"
                style={{ animationDelay: "0.8s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
