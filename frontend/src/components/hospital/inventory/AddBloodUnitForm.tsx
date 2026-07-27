"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormData {
  bloodGroup: string;
  component: string;
  quantity: string;
  collectionDate: string;
  expiryDate: string;
  donor: string;
  source: string;
}

export default function AddBloodUnitForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    bloodGroup: "",
    component: "",
    quantity: "",
    collectionDate: "",
    expiryDate: "",
    donor: "",
    source: "appointment",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsSubmitting(false);
    router.push("/hospital/inventory");
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const components = ["Whole Blood", "Plasma", "Platelets", "RBC"];

  return (
    <Card className="!p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40"
            >
              <option value="" disabled>
                Select blood group
              </option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg} className="bg-surface text-text-primary">
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Component Type
            </label>
            <select
              name="component"
              value={formData.component}
              onChange={handleChange}
              required
              className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40"
            >
              <option value="" disabled>
                Select component
              </option>
              {components.map((c) => (
                <option key={c} value={c} className="bg-surface text-text-primary">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Quantity
            </label>
            <Input
              type="number"
              name="quantity"
              placeholder="Number of units"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Collection Date
            </label>
            <Input
              type="date"
              name="collectionDate"
              value={formData.collectionDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Expiry Date
            </label>
            <Input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Source
            </label>
            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40"
            >
              <option value="appointment">Appointment</option>
              <option value="campaign">Campaign</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Donor (optional)
            </label>
            <Input
              name="donor"
              placeholder="Enter donor name or ID"
              value={formData.donor}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Link href="/hospital/inventory">
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </Link>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Blood Unit"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
