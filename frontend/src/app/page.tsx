import Link from "next/link";
import {
  ArrowRight,
  CalendarBlank,
  Drop,
  Heart,
  Megaphone,
  Package,
  PaperPlaneTilt,
  Warehouse,
} from "@phosphor-icons/react/dist/ssr";
import { PublicHeader, PublicFooter, MarqueeTicker } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { tickerStats } from "@/lib/mock-data";

const workflows = [
  {
    icon: CalendarBlank,
    title: "Schedule donations",
    desc: "Donors book collection slots. Hospitals confirm, complete, or reject appointments from a single queue.",
  },
  {
    icon: Megaphone,
    title: "Run collection campaigns",
    desc: "Launch targeted drives by blood group and track registrations against available capacity.",
  },
  {
    icon: Package,
    title: "Track every unit",
    desc: "Follow blood from collection through verification, storage, reservation, transfer, and use.",
  },
  {
    icon: PaperPlaneTilt,
    title: "Fulfill requests",
    desc: "Submit and accept inter-facility blood requests with urgency labels and audit history.",
  },
];

export default function LandingPage() {
  return (
    <>
      <PublicHeader />
      <MarqueeTicker items={tickerStats} />

      <main>
        <section className="min-h-[100dvh] border-b border-border">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12 lg:min-h-[100dvh]">
            <div className="flex flex-col justify-center px-4 py-16 lg:col-span-7 lg:border-r lg:border-border lg:py-24 lg:pl-8 lg:pr-16">
              <p className="mb-4 text-xs font-medium uppercase tracking-widest text-accent">Healthcare logistics platform</p>
              <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-6xl md:leading-none">
                Blood operations built for clinical teams and donors.
              </h1>
              <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                VitalDrops connects appointment scheduling, campaign management, unit tracking, inventory visibility, and transfer coordination without social noise or decorative dashboards.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href="/auth/register">
                  <Button size="lg" className="w-full sm:w-auto">
                    Register as donor <ArrowRight size={16} weight="bold" />
                  </Button>
                </Link>
                <Link href="/hospital/dashboard">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Hospital portal
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-end bg-muted/20 px-4 py-12 lg:col-span-5 lg:p-10">
              <div className="border border-accent/40 bg-accent/5 p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-accent">Operational alert</p>
                <p className="mt-3 text-xl font-semibold tracking-tight">O- inventory below threshold in 3 facilities</p>
                <p className="mt-2 text-sm text-muted-foreground">17 units region-wide. Open requests and active campaigns require donor response.</p>
                <Link href="/portal/campaigns" className="mt-4 inline-block text-xs font-medium uppercase tracking-wider text-accent hover:underline">
                  View active campaigns
                </Link>
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-px border border-border bg-border">
                {[
                  { label: "Open requests", val: "3" },
                  { label: "Pending confirmations", val: "6" },
                  { label: "Units at risk", val: "4 groups" },
                  { label: "Active transfers", val: "2" },
                ].map((s) => (
                  <div key={s.label} className="bg-background p-4">
                    <dt className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{s.label}</dt>
                    <dd className="mt-1 font-mono text-2xl font-semibold tracking-tight text-accent">{s.val}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="workflows" className="border-b border-border py-20">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="mb-12 max-w-xl">
              <p className="text-xs font-medium uppercase tracking-widest text-accent">Workflows</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Purpose-built for blood operations</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {workflows.map((item, index) => (
                <div key={item.title} className={`flex gap-5 ${index % 2 === 1 ? "md:mt-12" : ""}`}>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-border text-accent">
                    <item.icon size={22} weight="regular" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="operations" className="border-b border-border bg-muted/20 py-20">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-accent">Unit lifecycle</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight">Status you can audit at every step</h2>
                <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                  Every unit moves through collected, verified, stored, reserved, transferred, used, expired, or rejected states with actor and timestamp history.
                </p>
                <ul className="mt-8 space-y-2 font-mono text-xs text-muted-foreground">
                  {["COLLECTED", "VERIFIED", "STORED", "RESERVED", "TRANSFERRED", "USED"].map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 bg-accent" aria-hidden />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-border bg-background p-6">
                <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  <Warehouse size={14} aria-hidden /> Inventory snapshot
                </div>
                <div className="space-y-3">
                  {[
                    { group: "O-", units: 17, risk: true },
                    { group: "A+", units: 91, risk: false },
                    { group: "B-", units: 11, risk: true },
                  ].map((row) => (
                    <div key={row.group} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
                      <span className="font-mono text-sm">{row.group}</span>
                      <span className="font-mono text-sm">{row.units} units</span>
                      {row.risk && <span className="text-xs font-medium uppercase tracking-wider text-accent">At risk</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="hospitals" className="py-20">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div className="order-2 lg:order-1 border border-border p-8">
                <Drop size={28} weight="fill" className="text-accent" />
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                  Hospital teams manage appointments, process donations, verify units, monitor inventory, respond to requests, and coordinate transfers from one operations queue.
                </p>
                <Link href="/hospital/dashboard" className="mt-6 inline-block">
                  <Button>Open hospital dashboard</Button>
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-xs font-medium uppercase tracking-widest text-accent">For hospitals</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">Dense operational views, not vanity metrics</h2>
                <ul className="mt-8 space-y-4">
                  {[
                    { icon: Heart, text: "Donation review with state-based actions" },
                    { icon: Package, text: "Unit verification and journey tracking" },
                    { icon: PaperPlaneTilt, text: "Request acceptance with full audit trail" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm">
                      <Icon size={18} className="text-accent" aria-hidden />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-accent py-16">
          <div className="mx-auto max-w-[1400px] px-4 text-left md:text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">Start with the workflow you need today</h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-center">
              <Link href="/portal/dashboard"><Button size="lg" className="w-full bg-white text-accent hover:bg-zinc-100 sm:w-auto">Donor portal</Button></Link>
              <Link href="/auth/login"><Button variant="secondary" size="lg" className="w-full border-white text-white hover:bg-white/10 sm:w-auto">Sign in</Button></Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
