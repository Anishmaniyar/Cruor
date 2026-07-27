"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface InventoryFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  activeFilter: string;
  onFilterChange: (value: string) => void;
}

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Available", value: "available" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Critical", value: "critical" },
  { label: "Expiring Soon", value: "expiring" },
  { label: "Expired", value: "expired" },
  { label: "Whole Blood", value: "whole-blood" },
  { label: "Plasma", value: "plasma" },
  { label: "Platelets", value: "platelets" },
  { label: "RBC", value: "rbc" },
];

export default function InventoryFilters({
  searchQuery,
  onSearchChange,
  activeFilter,
  onFilterChange,
}: InventoryFiltersProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:w-72">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted pointer-events-none" />
        <Input
          placeholder="Search by blood group or component..."
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
