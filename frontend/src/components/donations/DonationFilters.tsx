"use client";

import { Badge } from "@/components/ui/badge";

export type DonationFilter = "all" | "hospital" | "campaign" | "completed" | "rejected";

interface DonationFiltersProps {
  activeFilter: DonationFilter;
  onFilterChange: (filter: DonationFilter) => void;
}

const FILTERS: { key: DonationFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hospital", label: "Hospital Appointments" },
  { key: "campaign", label: "Campaigns" },
  { key: "completed", label: "Completed" },
  { key: "rejected", label: "Rejected" },
];

export default function DonationFilters({ activeFilter, onFilterChange }: DonationFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map((filter) => (
        <Badge
          key={filter.key}
          variant={activeFilter === filter.key ? "default" : "outline"}
          className="cursor-pointer transition-colors px-3 py-1.5"
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}
