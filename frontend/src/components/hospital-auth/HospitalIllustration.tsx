
import { Hospital, ShieldCheck, HeartPulse } from "lucide-react";

export default function HospitalIllustration() {
  return (
    <div className="relative hidden h-full w-full lg:flex lg:w-1/2">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface to-background" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-12">
        {/* Branding */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20">
              <Hospital className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Vital Drops
              </h2>
              <p className="text-xs text-text-muted">Hospital Portal</p>
            </div>
          </div>
        </div>

        {/* Center Content */}
        <div className="space-y-8">
          {/* Illustration Icon */}
          <div className="flex h-48 w-48 items-center justify-center rounded-3xl border border-border bg-surface/50 backdrop-blur-sm mx-auto">
            <div className="relative">
              <Hospital className="h-24 w-24 text-primary/80" />
              <div className="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                <ShieldCheck className="h-6 w-6 text-success" />
              </div>
              <div className="absolute -top-2 -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                <HeartPulse className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 text-center">
            <h1 className="text-2xl font-medium tracking-tight text-text-primary">
              Hospital Network
            </h1>
            <p className="mx-auto max-w-sm text-sm leading-relaxed text-text-secondary">
              Manage your hospital&apos;s blood donation campaigns, track
              appointments, and collaborate with donors — all in one place.
            </p>
          </div>

          {/* Feature List */}
          <div className="mx-auto max-w-sm space-y-3">
            {[
              "Manage donation campaigns",
              "Track blood inventory",
              "Schedule appointments",
              "Monitor donor engagement",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10">
                  <ShieldCheck className="h-3.5 w-3.5 text-success" />
                </div>
                <span className="text-sm text-text-secondary">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-text-muted">
          <p>&copy; 2026 Vital Drops. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
