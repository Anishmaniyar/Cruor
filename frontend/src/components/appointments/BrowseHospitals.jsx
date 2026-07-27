"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import HospitalCard from "./HospitalCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const hospitals = [
  {
    id: "ruby-hall",
    name: "Ruby Hall Clinic",
    location: "Shivajinagar, Pune",
    rating: 4.8,
    workingHours: "8 AM - 5 PM",
    donationType: "Whole Blood",
    availableSlots: 18,
  },
  {
    id: "sassoon",
    name: "Sassoon General Hospital",
    location: "Pune",
    rating: 4.6,
    workingHours: "9 AM - 4 PM",
    donationType: "Whole Blood",
    availableSlots: 12,
  },
];

const filterChips = [
  { label: "Open Today", active: false },
  { label: "Nearby", active: false },
  { label: "Government", active: false },
  { label: "Private", active: false },
  { label: "Whole Blood", active: false },
];

export default function BrowseHospital() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="section">
      <div className="section-header">
        <h2 className="section-title">Browse Hospitals</h2>
        <p className="section-description">
          Find nearby verified hospitals and schedule your next donation.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search hospitals by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search hospitals"
              className="h-12 w-full rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40"
            />
          </div>
          <Button variant="secondary" size="sm">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {filterChips.map((chip) => (
            <Badge
              key={chip.label}
              variant={chip.active ? "default" : "outline"}
              className="cursor-pointer transition-colors"
            >
              {chip.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {hospitals
          .filter(
            (hospital) =>
              hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              hospital.location.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} />
          ))}
      </div>

      {/* Empty State */}
      {hospitals.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hospital.location.toLowerCase().includes(searchQuery.toLowerCase()),
      ).length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon-box">
            <Search className="empty-state-icon" />
          </div>
          <p className="empty-state-title">No hospitals found</p>
          <p className="empty-state-description">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      )}
    </section>
  );
}
