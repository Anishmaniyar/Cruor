"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface FilterOption {
  label: string;
  value: string;
}

interface AppointmentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const filterOptions: FilterOption[] = [
  { label: "All", value: "all" },
  { label: "Today", value: "today" },
  { label: "Tomorrow", value: "tomorrow" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "No Show", value: "no-show" },
];

export default function AppointmentFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: AppointmentFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Search */}
      <div className="relative w-full lg:w-72">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
        <Input
          placeholder="Search by donor name or blood group..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onFilterChange(option.value)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
              activeFilter === option.value
                ? "bg-primary text-primary-foreground"
                : "bg-surface text-text-secondary border border-border hover:border-border-light hover:text-text-primary"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
