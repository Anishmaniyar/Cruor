"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { X } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  recordDonationSchema,
  type RecordDonationFormValues,
} from "@/lib/validations/donation";
import { BLOOD_GROUPS } from "@/lib/validations/auth";
import type { RecordDonationPayload } from "@/services/donation.services";
import { getErrorMessage } from "@/lib/error";

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40";

interface RecordDonationModalProps {
  onClose: () => void;
  title: string;
  subtitle?: string;
  onSubmit: (payload: RecordDonationPayload) => Promise<void>;
}

export default function RecordDonationModal({
  onClose,
  title,
  subtitle,
  onSubmit,
}: RecordDonationModalProps) {
  const form = useForm<RecordDonationFormValues>({
    resolver: zodResolver(recordDonationSchema),
    defaultValues: {
      donationDate: format(new Date(), "yyyy-MM-dd"),
      volume: 450,
      status: "COMPLETED",
    },
  });

  const handleSubmit = async (data: RecordDonationFormValues) => {
    try {
      await onSubmit({
        donationDate: data.donationDate,
        bloodGroup: data.bloodGroup,
        volume: Number(data.volume),
        status: data.status ?? "COMPLETED",
      });
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to record donation"));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            {subtitle && (
              <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Donation Date
            </label>
            <Input
              type="date"
              className={fieldClass}
              {...form.register("donationDate")}
            />
            {form.formState.errors.donationDate && (
              <p className="text-sm text-danger">
                {form.formState.errors.donationDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Blood Group
            </label>
            <select className={fieldClass} {...form.register("bloodGroup")}>
              <option value="">Select blood group</option>
              {BLOOD_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            {form.formState.errors.bloodGroup && (
              <p className="text-sm text-danger">
                {form.formState.errors.bloodGroup.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Volume (ml)
              </label>
              <Input
                type="number"
                min="1"
                placeholder="450"
                className={fieldClass}
                {...form.register("volume")}
              />
              {form.formState.errors.volume && (
                <p className="text-sm text-danger">
                  {form.formState.errors.volume.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Status
              </label>
              <select className={fieldClass} {...form.register("status")}>
                <option value="COMPLETED">Completed</option>
                <option value="REJECTED">Rejected</option>
              </select>
              {form.formState.errors.status && (
                <p className="text-sm text-danger">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? "Recording..."
                : "Record Donation"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
