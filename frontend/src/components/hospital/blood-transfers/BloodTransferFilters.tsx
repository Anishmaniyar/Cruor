"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BloodTransferFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Preparing", value: "preparing" },
  { label: "Dispatched", value: "dispatched" },
  { label: "Delivered", value: "delivered" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "O+", value: "O+" },
  { label: "A+", value: "A+" },
  { label: "B+", value: "B+" },
];

export default function BloodTransferFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: BloodTransferFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:w-72">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
        <Input
          placeholder="Search by Transfer ID, hospital or blood group..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

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
