"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormData {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxDonors: string;
}

export default function CreateCampaignForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    maxDonors: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    router.push("/hospital/campaigns");
  };

  return (
    <Card className="!p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Campaign Name
          </label>
          <Input
            name="name"
            placeholder="Enter campaign name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Describe the campaign purpose and details..."
            value={formData.description}
            onChange={handleChange}
            required
            className="h-24 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 outline-none focus:border-border-light focus:ring-2 focus:ring-ring/40 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Campaign Date
            </label>
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Location
            </label>
            <Input
              name="location"
              placeholder="Enter venue address"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Start Time
            </label>
            <Input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              End Time
            </label>
            <Input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Maximum Donors (optional)
          </label>
          <Input
            type="number"
            name="maxDonors"
            placeholder="Enter maximum number of donors"
            value={formData.maxDonors}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/hospital/campaigns">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
