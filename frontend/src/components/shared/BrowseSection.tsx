"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import SectionHeader from "./SectionHeader";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

interface Filter {
  label: string;
  active: boolean;
}

interface BrowseSectionProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters?: Filter[];
  onFilterClick?: (index: number) => void;
  emptyMessage?: string;
  emptyDescription?: string;
  children: React.ReactNode;
  /** If true, cards below will be shown muted/disabled with a message */
  disabled?: boolean;
  disabledMessage?: string;
  /** When there are no cards to show after filtering */
  isEmpty?: boolean;
}

export default function BrowseSection({
  title,
  description,
  searchPlaceholder = "Search...",
  searchQuery,
  onSearchChange,
  filters = [],
  onFilterClick,
  emptyMessage = "No results found",
  emptyDescription = "Try adjusting your search or filters.",
  children,
  disabled = false,
  disabledMessage,
  isEmpty = false,
}: BrowseSectionProps) {
  return (
    <section className="section">
      <SectionHeader title={title} description={description} />

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            ariaLabel={`Search ${title.toLowerCase()}`}
          />
          <Button variant="secondary" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <FilterBar filters={filters} onFilterClick={onFilterClick ?? (() => {})} />
      </div>

      {/* Disabled overlay message */}
      {disabled && disabledMessage && (
        <div className="rounded-2xl border border-border bg-surface p-4 text-center">
          <p className="text-sm text-text-secondary">{disabledMessage}</p>
        </div>
      )}

      {/* Cards Grid */}
      <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 ${disabled ? "pointer-events-none opacity-50" : ""}`}>
        {children}
      </div>

      {/* Empty State */}
      {!disabled && isEmpty && (
        <div className="empty-state">
          <div className="empty-state-icon-box">
            <Search className="empty-state-icon" />
          </div>
          <p className="empty-state-title">{emptyMessage}</p>
          <p className="empty-state-description">{emptyDescription}</p>
        </div>
      )}
    </section>
  );
}
