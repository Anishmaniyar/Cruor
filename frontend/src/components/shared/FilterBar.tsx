"use client";

import { Badge } from "@/components/ui/badge";

interface Filter {
  label: string;
  active: boolean;
}

interface FilterBarProps {
  filters: Filter[];
  onFilterClick: (index: number) => void;
}

export default function FilterBar({ filters, onFilterClick }: FilterBarProps) {
  if (filters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <Badge
          key={filter.label}
          variant={filter.active ? "default" : "outline"}
          className="cursor-pointer transition-colors"
          onClick={() => onFilterClick(index)}
        >
          {filter.label}
        </Badge>
      ))}
    </div>
  );
}
