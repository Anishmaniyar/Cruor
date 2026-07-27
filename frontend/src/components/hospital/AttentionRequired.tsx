import { AlertTriangle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const alerts = [
  {
    text: "2 appointments awaiting confirmation",
    href: "/hospital/appointments",
  },
  {
    text: "1 high-priority blood request",
    href: "/hospital/requests",
  },
  {
    text: "3 blood units expiring within 7 days",
    href: "/hospital/inventory",
  },
];

export default function AttentionRequired() {
  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-400">
            Attention Required
          </h3>
          <ul className="mt-3 space-y-2">
            {alerts.map((alert) => (
              <li key={alert.text} className="flex items-center gap-2 text-sm text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0" />
                {alert.text}
              </li>
            ))}
          </ul>

          <Link href="/hospital/appointments">
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 gap-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
