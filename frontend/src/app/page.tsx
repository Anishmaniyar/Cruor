import Link from "next/link";
import {
  Activity, ArrowRight, Building2, Calendar, Droplets, Heart, Megaphone, Package, Send, Shield, Users,
} from "lucide-react";
import { PublicHeader, PublicFooter, MarqueeTicker } from "@/components/layout/public-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { tickerStats } from "@/lib/mock-data";

const features = [
  { icon: Calendar, title: "Smart Appointments", desc: "Book and manage blood donation appointments with real-time availability across partner hospitals." },
  { icon: Megaphone, title: "Blood Campaigns", desc: "Join community drives and emergency collection campaigns. Register in seconds, save lives for years." },
  { icon: Heart, title: "Donation Tracking", desc: "Complete history of every donation with downloadable certificates and impact metrics." },
  { icon: Package, title: "Unit Tracking", desc: "End-to-end blood unit journey from collection through verification, storage, and transfusion." },
  { icon: Activity, title: "Live Inventory", desc: "Real-time blood group inventory with low-stock alerts and expiry monitoring." },
  { icon: Send, title: "Emergency Requests", desc: "Critical blood requests between hospitals with priority routing and transfer management." },
];

export default function LandingPage() {
  const today = new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date());

  return (
    <>
      <PublicHeader />
      <MarqueeTicker items={tickerStats} />

      <main>
        {/* Hero */}
        <section className="newsprint-texture border-b border-border">
          <div className="mx-auto max-w-screen-xl px-4 py-16 lg:py-24">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8 border-b border-border pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Vol. 1 | {today} | Blood Management Edition
                </p>
                <h1 className="font-serif text-5xl font-black leading-[0.9] tracking-tighter sm:text-6xl lg:text-8xl">
                  Every Drop
                  <span className="block text-accent">Counts.</span>
                </h1>
                <p className="drop-cap mt-8 max-w-xl font-body text-base leading-relaxed text-muted-foreground text-justify">
                  VitalDrops connects blood donors with hospitals to streamline donations, manage inventory, and respond to emergencies. One platform. Countless lives saved.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Link href="/auth/register">
                    <Button size="lg" className="w-full sm:w-auto">
                      Become a Donor <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/login">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Hospital Login
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col justify-end">
                <div className="border border-border bg-card p-6">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-4">Breaking</p>
                  <p className="font-serif text-2xl font-bold leading-tight">O- Blood Critically Low Across Region</p>
                  <p className="mt-3 font-body text-sm text-muted-foreground">18 units remaining. Emergency donors urgently needed at Metro General and partner facilities.</p>
                  <Link href="/portal/campaigns" className="mt-4 inline-block font-mono text-xs uppercase tracking-widest text-accent hover:underline">
                    View Active Campaigns →
                  </Link>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-0 border border-border">
                  {[
                    { val: "12,847", label: "Units Collected" },
                    { val: "48", label: "Hospitals" },
                    { val: "2,341", label: "Lives Saved" },
                    { val: "856", label: "Active Donors" },
                  ].map((stat, i) => (
                    <div key={stat.label} className={`p-4 ${i % 2 === 0 ? "border-r border-border" : ""} ${i < 2 ? "border-b border-border" : ""}`}>
                      <p className="font-serif text-2xl font-black text-accent">{stat.val}</p>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-b border-border py-16">
          <div className="mx-auto max-w-screen-xl px-4">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Platform Features</p>
            <h2 className="font-serif text-4xl font-black lg:text-5xl mb-12">Built for Donors & Hospitals</h2>
            <div className="grid grid-cols-1 border border-border md:grid-cols-2 lg:grid-cols-3">
              {features.map((f, i) => (
                <Card key={f.title} className={`border-0 border-b md:border-r ${i % 3 === 2 ? "lg:border-r-0" : ""} ${i >= 3 ? "lg:border-b-0" : ""} hover:bg-card-hover transition-colors`} hover={false}>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center border border-border text-accent hover:bg-accent hover:text-foreground transition-all">
                    <f.icon className="h-6 w-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-2">{f.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-b border-border bg-muted py-16 newsprint-texture">
          <div className="mx-auto max-w-screen-xl px-4">
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Process</p>
            <h2 className="font-serif text-4xl font-black lg:text-5xl mb-12">How VitalDrops Works</h2>
            <div className="grid grid-cols-1 gap-0 border border-border lg:grid-cols-4">
              {[
                { step: "01", title: "Register", desc: "Create your donor or hospital account in minutes." },
                { step: "02", title: "Connect", desc: "Book appointments or launch blood collection campaigns." },
                { step: "03", title: "Donate", desc: "Complete donations with full tracking and certification." },
                { step: "04", title: "Track", desc: "Monitor inventory, requests, and transfers in real time." },
              ].map((item, i) => (
                <div key={item.step} className={`p-8 ${i < 3 ? "border-b lg:border-b-0 lg:border-r border-border" : ""}`}>
                  <span className="font-serif text-5xl font-black text-accent">{item.step}</span>
                  <h3 className="mt-4 font-serif text-2xl font-bold">{item.title}</h3>
                  <p className="mt-2 font-body text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Hospitals */}
        <section id="for-hospitals" className="border-b border-border py-16">
          <div className="mx-auto max-w-screen-xl px-4">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">For Hospitals</p>
                <h2 className="font-serif text-4xl font-black lg:text-5xl">Complete Blood Bank Management</h2>
                <p className="mt-6 font-body text-sm leading-relaxed text-muted-foreground text-justify">
                  Manage your entire blood bank operation from a single dashboard. Track units from collection to transfusion, respond to emergency requests, and generate compliance reports.
                </p>
                <ul className="mt-8 space-y-4">
                  {[
                    { icon: Shield, text: "Verified unit tracking with audit trail" },
                    { icon: Activity, text: "Real-time inventory with expiry alerts" },
                    { icon: Users, text: "Campaign and appointment management" },
                    { icon: Building2, text: "Inter-hospital transfer coordination" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-accent text-accent">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <span className="font-sans text-sm">{text}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/hospital/dashboard" className="mt-8 inline-block">
                  <Button>Explore Hospital Portal <ArrowRight className="h-4 w-4" /></Button>
                </Link>
              </div>
              <div className="lg:col-span-7">
                <div className="border border-border bg-card p-1">
                  <div className="border border-border bg-muted p-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Droplets className="h-4 w-4 text-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Hospital Dashboard Preview</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Total Units", val: "379", alert: false },
                        { label: "Pending Requests", val: "3", alert: true },
                        { label: "Active Campaigns", val: "2", alert: false },
                        { label: "Low Stock Alerts", val: "4", alert: true },
                      ].map((s) => (
                        <div key={s.label} className={`border p-4 ${s.alert ? "border-accent bg-accent/5" : "border-border bg-card"}`}>
                          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{s.label}</p>
                          <p className={`font-serif text-3xl font-black mt-1 ${s.alert ? "text-accent" : ""}`}>{s.val}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-accent py-16">
          <div className="mx-auto max-w-screen-xl px-4 text-center">
            <h2 className="font-serif text-4xl font-black text-foreground lg:text-6xl">Ready to Save Lives?</h2>
            <p className="mt-4 font-body text-foreground/80 max-w-lg mx-auto">
              Join thousands of donors and hospitals already using VitalDrops to make every drop count.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/auth/register"><Button variant="secondary" size="lg" className="w-full sm:w-auto border-foreground text-foreground hover:bg-foreground hover:text-accent">Register as Donor</Button></Link>
              <Link href="/portal/dashboard"><Button size="lg" className="w-full sm:w-auto bg-foreground text-accent hover:bg-background hover:text-accent">View Donor Portal</Button></Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
