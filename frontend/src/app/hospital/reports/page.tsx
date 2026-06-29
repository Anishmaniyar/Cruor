import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/card";
import { Heart, Megaphone, Package, PaperPlaneTilt, ArrowsLeftRight } from "@phosphor-icons/react/dist/ssr";

const reportSections = [
  { title: "Donation reports", desc: "Collection volume, processing times, and rejection rates by period.", icon: Heart, stats: [{ label: "This month", val: "847" }, { label: "Rejection rate", val: "2.1%" }] },
  { title: "Campaign reports", desc: "Registration fill rates and slot utilization across active drives.", icon: Megaphone, stats: [{ label: "Active", val: "2" }, { label: "Avg fill", val: "68.4%" }] },
  { title: "Inventory reports", desc: "Turnover, wastage, and expiry events by blood group.", icon: Package, stats: [{ label: "Units on hand", val: "375" }, { label: "Turnover", val: "4.6 days" }] },
  { title: "Request reports", desc: "Fulfillment duration and urgency breakdown.", icon: PaperPlaneTilt, stats: [{ label: "Open", val: "3" }, { label: "Median response", val: "2.8 hrs" }] },
  { title: "Transfer reports", desc: "Delivery performance and in-transit duration.", icon: ArrowsLeftRight, stats: [{ label: "This month", val: "24" }, { label: "On-time", val: "94.2%" }] },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader label="Reports" title="Operational reports" description="Domain reports tied to donations, inventory, requests, and transfers." />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {reportSections.map((section) => (
          <Section key={section.title} title={section.title}>
            <div className="border border-border p-5">
              <div className="mb-4 flex items-center gap-3">
                <section.icon size={20} className="text-accent" aria-hidden />
                <p className="text-sm text-muted-foreground">{section.desc}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                {section.stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    <p className="mt-1 font-mono text-xl font-semibold tracking-tight">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </Section>
        ))}
      </div>
    </>
  );
}
