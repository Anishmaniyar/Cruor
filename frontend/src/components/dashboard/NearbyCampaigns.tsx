import { MapPin, CalendarDays, ArrowUpRight, LocateFixed } from "lucide-react";
import Link from "next/link"; // Required for clean navigation

// Try changing this array to empty 'const campData = [];' to test your empty state layout!
const campData = [
  {
    id: "camp-1",
    name: "Mega Blood Donation Camp",
    location: "Community Center, Pune",
    date: "10th August, 2026",
  },
  {
    id: "camp-2",
    name: "Red Cross Lifesavers Drive",
    location: "Metro Station Plaza, Road 12",
    date: "12th August, 2026",
  },
];

export default function NearbyCampaigns() {
  // Check if our data list is completely empty
  const hasNoCampaigns = campData.length === 0;

  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-neutral-950 p-4 shadow-xl">
      <h2 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider mb-4 px-1">
        📍 Nearby Campaigns
      </h2>

      {/* CONDITIONAL RENDER: Show empty state UI if true, otherwise loop the list */}
      {hasNoCampaigns ? (
        /* --- 1. EMPTY STATE LAYOUT --- */
        <div className="flex flex-col items-center justify-center text-center p-6 rounded-lg border border-dashed border-white/10 bg-neutral-900/10">
          <LocateFixed size={28} className="text-neutral-600 mb-3" />
          <p className="text-sm text-neutral-400 font-medium">
            No campaigns are available near your location.
          </p>

          {/* Main call to action navigation link wrapper */}
          <Link href="/dashboard/campaign">
            <button className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-white/10 hover:border-white/20 transition-all">
              Browse All Campaigns
            </button>
          </Link>
        </div>
      ) : (
        /* --- 2. ACTIVE DATA LIST LAYOUT --- */
        <div className="flex flex-col gap-3">
          {campData.map((data) => (
            /* INTERACTIVE TIP: Wrapping the card layout shell inside Next.js <Link> 
               enables full row clicking to a dynamic details page path */
            <Link
              key={data.id}
              href={`/dashboard/campaign/${data.id}`}
              className="group flex items-center justify-between p-3 rounded-lg border border-white/5 bg-neutral-900/30 hover:bg-neutral-900 hover:border-white/10 transition-all cursor-pointer"
            >
              {/* Left side text columns */}
              <div className="flex flex-col gap-1">
                <h1 className="text-sm font-semibold text-neutral-100 group-hover:text-emerald-400 transition-colors">
                  {data.name}
                </h1>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                  <MapPin size={12} className="text-neutral-500" />
                  <span>{data.location}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-0.5">
                  <CalendarDays size={12} className="text-neutral-500" />
                  <span className="font-medium text-neutral-300">
                    {data.date}
                  </span>
                </div>
              </div>

              {/* Right side interactive button container indicator */}
              <div className="p-2 rounded-md bg-neutral-900 border border-white/5 text-neutral-400 group-hover:text-white group-hover:bg-neutral-800 transition-all">
                <ArrowUpRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
