import Link from "next/link";
import { Droplets, CalendarCheck, Megaphone, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AddBloodUnitForm() {
  return (
    <Card className="!p-8">
      <div className="mx-auto max-w-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
          <Droplets className="h-7 w-7 text-primary" />
        </div>

        <h2 className="text-lg font-semibold text-text-primary">
          Blood Units Are Created Automatically
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">
          Every successful donation automatically creates a blood unit in your
          hospital&apos;s inventory — including its blood group, volume,
          collection and expiration dates, and storage location. There is no
          manual entry step.
        </p>

        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <Link
            href="/hospital/appointments"
            className="group rounded-xl border border-border bg-surface-secondary p-5 transition-colors hover:border-border-light hover:bg-surface-hover"
          >
            <CalendarCheck className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold text-text-primary">
              Record a Donation from an Appointment
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Complete a confirmed appointment to add its blood unit to stock.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Go to appointments
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/hospital/campaigns"
            className="group rounded-xl border border-border bg-surface-secondary p-5 transition-colors hover:border-border-light hover:bg-surface-hover"
          >
            <Megaphone className="h-5 w-5 text-primary" />
            <p className="mt-3 text-sm font-semibold text-text-primary">
              Record a Donation from a Campaign
            </p>
            <p className="mt-1 text-xs text-text-secondary">
              Record donations for registered campaign donors to grow your stock.
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
              Go to campaigns
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <Link href="/hospital/inventory" className="mt-8 inline-block">
          <Button variant="secondary">Back to Inventory</Button>
        </Link>
      </div>
    </Card>
  );
}
