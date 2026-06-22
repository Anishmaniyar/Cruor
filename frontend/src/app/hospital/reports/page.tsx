import { PageHeader } from "@/components/ui/page-header";
import { StatCard, Card } from "@/components/ui/card";
import { inventoryByGroup } from "@/lib/mock-data";
import { BarChart3, Heart, Megaphone, Package, Send, ArrowLeftRight } from "lucide-react";

const reportSections = [
  { title: "Donation Reports", desc: "Monthly and yearly donation statistics, donor demographics, and collection trends.", icon: Heart, stats: [{ label: "This Month", val: "847" }, { label: "YoY Growth", val: "+12%" }] },
  { title: "Campaign Reports", desc: "Campaign performance, registration rates, and conversion metrics.", icon: Megaphone, stats: [{ label: "Active", val: "2" }, { label: "Avg. Fill Rate", val: "71%" }] },
  { title: "Inventory Reports", desc: "Stock levels, turnover rates, wastage, and expiry analysis.", icon: Package, stats: [{ label: "Total Units", val: "387" }, { label: "Turnover", val: "4.2 days" }] },
  { title: "Request Reports", desc: "Fulfillment rates, response times, and emergency request analytics.", icon: Send, stats: [{ label: "Open", val: "3" }, { label: "Avg. Response", val: "2.4 hrs" }] },
  { title: "Transfer Reports", desc: "Inter-hospital transfer volumes, delivery times, and network activity.", icon: ArrowLeftRight, stats: [{ label: "This Month", val: "24" }, { label: "On-Time", val: "96%" }] },
];

export default function ReportsPage() {
  const totalUnits = inventoryByGroup.reduce((sum, g) => sum + g.units, 0);

  return (
    <>
      <PageHeader label="Analytics" title="Reports Dashboard" description="Comprehensive reports across all blood bank operations." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Donations (YTD)" value="4,218" icon={<Heart className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Inventory Units" value={totalUnits} icon={<Package className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Requests Fulfilled" value="94%" icon={<Send className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Transfer Success" value="96%" icon={<BarChart3 className="h-5 w-5" strokeWidth={1.5} />} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reportSections.map((section) => (
          <Card key={section.title} hover className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center border border-accent text-accent">
                <section.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-lg font-bold">{section.title}</h3>
            </div>
            <p className="font-body text-sm text-muted-foreground flex-1">{section.desc}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
              {section.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                  <p className="font-serif text-xl font-black text-accent">{s.val}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
