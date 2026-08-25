"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Droplets,
  Heart,
  Calendar,
  Bell,
  Brain,
  Users,
  Building2,
  Shield,
  MapPin,
  Clock,
  BarChart3,
  ArrowRight,
} from "lucide-react";

// Impact Stats Data
const impactStats = [
  {
    label: "Blood Units Collected",
    value: "25,430",
    change: "+12%",
    icon: Droplets,
  },
  {
    label: "Lives Impacted",
    value: "76,210",
    change: "+18%",
    icon: Heart,
  },
  {
    label: "Partner Hospitals",
    value: "520+",
    change: "+9%",
    icon: Building2,
  },
];

// AI Tools Data
const aiTools = [
  {
    title: "Predict Blood Demand",
    description: "Help hospitals prepare better",
  },
  {
    title: "Smart Donor Matching",
    description: "Find the right donor, faster",
  },
  {
    title: "Eligibility Assistant",
    description: "Check your donation eligibility",
  },
];

// Benefits Data
const benefits = [
  {
    icon: Shield,
    title: "Secure & Transparent",
    description: "Your data is safe with us",
  },
  {
    icon: MapPin,
    title: "Find Nearby Drives",
    description: "Blood donation camps near you",
  },
  {
    icon: Clock,
    title: "Timely Reminders",
    description: "Never miss your next donation opportunity",
  },
  {
    icon: BarChart3,
    title: "Real Impact",
    description: "Track your contribution and impact",
  },
];

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Trigger entrance animations
    const timer = setTimeout(() => setLoaded(true), 100);

    return () => {
      clearTimeout(timer);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-24 pb-8"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 flex flex-col flex-1">
        {/* Main Hero Container */}
        <div className="relative rounded-3xl border border-border bg-surface/50 backdrop-blur-sm p-8 lg:p-12 flex-1 flex flex-col min-h-[600px]">

          {/* ═══════════════════════════════════════
              CENTRAL HERO CONTENT
              ═══════════════════════════════════════ */}
          <div className="flex flex-col items-center text-center relative z-10">
            {/* Logo */}
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl overflow-hidden mb-6 transition-all duration-500 ease-out",
                loaded ? "opacity-100 scale-100" : "opacity-0 scale-90",
              )}
            >
              <Image
                src="/logo.png"
                alt="Cruor"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
                priority
              />
            </div>

            {/* Headline */}
            <h1
              className={cn(
                "text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-text-primary transition-all duration-500 ease-out",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              )}
              style={{ transitionDelay: loaded ? "100ms" : "0ms" }}
            >
              Save lives,
              <br />
              <span className="text-primary">one drop at a time</span>
            </h1>

            {/* Description */}
            <p
              className={cn(
                "mt-6 text-lg text-text-secondary leading-relaxed max-w-xl transition-all duration-500 ease-out",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              )}
              style={{ transitionDelay: loaded ? "200ms" : "0ms" }}
            >
              Cruor connects donors, hospitals, and patients on one platform
              to make blood donation simple, transparent, and truly impactful.
            </p>

            {/* CTA Button */}
            <div
              className={cn(
                "mt-8 transition-all duration-500 ease-out",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              )}
              style={{ transitionDelay: loaded ? "300ms" : "0ms" }}
            >
              <Link href="/signup">
                <Button variant="primary" size="default" className="h-12 px-8 text-base">
                  Get started for free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Trust Section */}
            <div
              className={cn(
                "mt-10 flex flex-col items-center gap-3 transition-all duration-500 ease-out",
                loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              )}
              style={{ transitionDelay: loaded ? "400ms" : "0ms" }}
            >
              {/* Avatars */}
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-surface bg-surface-secondary flex items-center justify-center"
                  >
                    <Users className="h-4 w-4 text-text-muted" />
                  </div>
                ))}
              </div>
              {/* Trust Text */}
              <p className="text-sm text-text-muted text-center">
                Trusted by <span className="font-semibold text-text-primary">10,000+ donors</span> and{" "}
                <span className="font-semibold text-text-primary">500+ hospitals</span> across India
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              FLOATING CARDS — Desktop Only
              Positioned around the central content
              ═══════════════════════════════════════ */}

          {/* ── Top-Left: Donor Message ── */}
          <div
            className={cn(
              "hidden lg:block absolute z-20 w-56 rounded-xl border border-border bg-surface/90 backdrop-blur-sm p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              !prefersReducedMotion && "animate-[float1_5.5s_ease-in-out_infinite]",
            )}
            style={{
              top: "8%",
              left: "2%",
              transitionDelay: loaded ? "500ms" : "0ms",
            }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10 flex-shrink-0">
                <Heart className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary leading-tight">
                  Be a hero.
                </p>
                <p className="text-sm text-text-primary leading-tight">
                  Donate blood,
                </p>
                <p className="text-sm text-text-primary leading-tight">
                  save lives.
                </p>
              </div>
            </div>
          </div>

          {/* ── Top-Right: Donation Reminder ── */}
          <div
            className={cn(
              "hidden lg:block absolute z-20 w-56 rounded-xl border border-border bg-surface/90 backdrop-blur-sm p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              !prefersReducedMotion && "animate-[float2_6.5s_ease-in-out_infinite]",
            )}
            style={{
              top: "8%",
              right: "2%",
              transitionDelay: loaded ? "600ms" : "0ms",
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Bell className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs font-medium text-text-primary">Upcoming Donation</p>
              </div>
              <p className="text-xs text-text-muted">Your next eligible donation</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3 text-text-muted" />
                <span className="text-xs font-medium text-text-primary">12 May 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-text-muted" />
                <span className="text-xs font-medium text-text-primary">28 days left</span>
              </div>
            </div>
          </div>

          {/* ── Bottom-Left: Impact Stats ── */}
          <div
            className={cn(
              "hidden lg:block absolute z-20 w-64 rounded-xl border border-border bg-surface/90 backdrop-blur-sm p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              !prefersReducedMotion && "animate-[float3_5s_ease-in-out_infinite]",
            )}
            style={{
              bottom: "18%",
              left: "2%",
              transitionDelay: loaded ? "700ms" : "0ms",
            }}
          >
            <p className="text-xs font-medium text-text-primary mb-3">Our Impact</p>
            <div className="flex flex-col gap-3">
              {impactStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-text-muted truncate">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-text-primary">{stat.value}</p>
                      <span className="text-[10px] font-medium text-success">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Bottom-Right: AI Tools ── */}
          <div
            className={cn(
              "hidden lg:block absolute z-20 w-64 rounded-xl border border-border bg-surface/90 backdrop-blur-sm p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
              !prefersReducedMotion && "animate-[float4_7s_ease-in-out_infinite]",
            )}
            style={{
              bottom: "18%",
              right: "2%",
              transitionDelay: loaded ? "800ms" : "0ms",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-medium text-text-primary">AI-Powered Tools</p>
            </div>
            <div className="flex flex-col gap-3">
              {aiTools.map((tool) => (
                <div key={tool.title} className="flex items-center gap-3 group/item cursor-pointer">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary flex-shrink-0 group-hover/item:bg-primary/10 transition-colors">
                    <Droplets className="h-4 w-4 text-text-muted group-hover/item:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-text-primary">{tool.title}</p>
                    <p className="text-[10px] text-text-muted">{tool.description}</p>
                  </div>
                  <ArrowRight className="h-3 w-3 text-text-muted opacity-0 group-hover/item:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>

          {/* ═══════════════════════════════════════
              BOTTOM BENEFIT STRIP
              ═══════════════════════════════════════ */}
          <div
            className={cn(
              "mt-auto pt-4 border-t border-border transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            )}
            style={{ transitionDelay: loaded ? "500ms" : "0ms" }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="flex items-center gap-3 p-4 lg:p-5 group/benefit cursor-pointer hover:bg-surface-secondary/50 transition-colors duration-200"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 flex-shrink-0 group-hover/benefit:scale-105 transition-transform duration-200">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-text-primary">{benefit.title}</p>
                    <p className="text-xs text-text-muted truncate">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          MOBILE FLOATING CARDS — Stack in flow
          ═══════════════════════════════════════ */}
      <div className="lg:hidden mx-auto w-full max-w-7xl px-6 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Donor Message */}
          <div
            className={cn(
              "rounded-xl border border-border bg-surface/90 p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            )}
            style={{ transitionDelay: loaded ? "500ms" : "0ms" }}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10 flex-shrink-0">
                <Heart className="h-5 w-5 text-danger" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary leading-tight">Be a hero.</p>
                <p className="text-sm text-text-primary leading-tight">Donate blood,</p>
                <p className="text-sm text-text-primary leading-tight">save lives.</p>
              </div>
            </div>
          </div>

          {/* Donation Reminder */}
          <div
            className={cn(
              "rounded-xl border border-border bg-surface/90 p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            )}
            style={{ transitionDelay: loaded ? "600ms" : "0ms" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-medium text-text-primary">Upcoming Donation</p>
            </div>
            <p className="text-xs text-text-muted mb-2">Your next eligible donation</p>
            <div className="flex items-center gap-2">
              <Calendar className="h-3 w-3 text-text-muted" />
              <span className="text-xs font-medium text-text-primary">12 May 2025</span>
            </div>
          </div>

          {/* Impact Stats */}
          <div
            className={cn(
              "rounded-xl border border-border bg-surface/90 p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            )}
            style={{ transitionDelay: loaded ? "700ms" : "0ms" }}
          >
            <p className="text-xs font-medium text-text-primary mb-3">Our Impact</p>
            <div className="flex flex-col gap-2">
              {impactStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <stat.icon className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-text-muted truncate">{stat.label}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-text-primary">{stat.value}</p>
                      <span className="text-[10px] font-medium text-success">{stat.change}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Tools */}
          <div
            className={cn(
              "rounded-xl border border-border bg-surface/90 p-4 transition-all duration-500 ease-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5",
            )}
            style={{ transitionDelay: loaded ? "800ms" : "0ms" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs font-medium text-text-primary">AI-Powered Tools</p>
            </div>
            <div className="flex flex-col gap-2">
              {aiTools.map((tool) => (
                <div key={tool.title} className="flex items-center gap-2">
                  <Droplets className="h-3 w-3 text-text-muted flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-medium text-text-primary">{tool.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
