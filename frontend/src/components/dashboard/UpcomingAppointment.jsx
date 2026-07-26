import {
  MapPin,
  Clock,
  Calendar,
  CalendarRangeIcon,
  CheckCircle2,
} from "lucide-react";

export default function UpcomingAppointment() {
  return (
    <div className="w-full max-w-xl rounded-xl border border-white/10 bg-neutral-950 text-neutral-200 overflow-hidden shadow-xl">
      {/* 1. Header Block: Appointment Booked Status */}
      <div className="p-5 border-b border-white/10 bg-emerald-950/20 flex gap-3 items-start">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
        <div>
          <h2 className="text-sm font-semibold text-emerald-400 uppercase tracking-wide">
            Appointment Booked
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Your donation appointment is confirmed.
          </p>
        </div>
      </div>

      {/* 2. Hospital Details Block */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-neutral-100 flex items-center gap-2">
            🏥 City Blood Bank
          </h1>
          <p className="text-xs text-neutral-400 mt-1 pl-6">
            123 MG Road, 45 Colony, ABC, Pune
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-neutral-900/50 px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-900 hover:text-white transition-all shrink-0">
          <span>View Location</span>
          <MapPin size={14} className="text-emerald-400" />
        </button>
      </div>

      {/* 3. Donor ID & Appointment ID Meta Grid Block */}
      <div className="p-5 border-b border-white/10 grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Donor ID
          </h3>
          <p className="text-sm font-mono font-semibold text-neutral-200 mt-1">
            VD-1024
          </p>
        </div>

        <div>
          <h3 className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Appointment ID
          </h3>
          <p className="text-sm font-mono font-semibold text-neutral-200 mt-1">
            API-98765
          </p>
        </div>
      </div>

      {/* 4. Live Date & Time Schedules Block */}
      <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2.5 text-sm text-neutral-300">
          <Calendar size={16} className="text-neutral-500" />
          <span className="font-medium">Saturday, 20 August 2026</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-neutral-300">
          <Clock size={16} className="text-neutral-500" />
          <span>
            Time:{" "}
            <strong className="font-semibold text-neutral-100">10:30 AM</strong>
          </span>
        </div>
      </div>

      {/* 5. Footer Interaction Panel Block */}
      <div className="p-5 bg-neutral-900/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-neutral-400">Status:</span>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            Confirmed
          </span>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 border border-white/10 px-4 py-2 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:border-white/20 transition-all">
          <span>Reschedule Appointment</span>
          <CalendarRangeIcon size={14} />
        </button>
      </div>
    </div>
  );
}
