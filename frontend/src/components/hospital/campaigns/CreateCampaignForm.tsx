"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  createCampaignSchema,
  CreateCampaignSchemaType,
} from "@/lib/validations/campaign";
import { createCampaign } from "@/services/campaign.services";
import { getErrorMessage } from "@/lib/error";

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40";

export default function CreateCampaignForm() {
  const router = useRouter();

  const form = useForm<CreateCampaignSchemaType>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      campName: "",
      description: "",
      address: "",
      campaignDate: "",
      startTime: "",
      endTime: "",
      targetDonors: "",
    },
  });

  const onSubmit = async (data: CreateCampaignSchemaType) => {
    try {
      await createCampaign({
        ...data,
        targetDonors: Number(data.targetDonors),
      });

      toast.success("Campaign created successfully");
      router.push("/hospital/campaigns");
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create campaign"));
    }
  };

  return (
    <Card className="!p-8">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Campaign Name
          </label>
          <Input
            placeholder="Enter campaign name"
            className={fieldClass}
            {...form.register("campName")}
          />
          {form.formState.errors.campName && (
            <p className="text-sm text-danger">
              {form.formState.errors.campName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Description
          </label>
          <textarea
            placeholder="Describe the campaign purpose and details..."
            className="h-24 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 outline-none focus:border-border-light focus:ring-2 focus:ring-ring/40 resize-none"
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <p className="text-sm text-danger">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-text-primary">
            Address / Venue
          </label>
          <Input
            placeholder="Enter venue address"
            className={fieldClass}
            {...form.register("address")}
          />
          {form.formState.errors.address && (
            <p className="text-sm text-danger">
              {form.formState.errors.address.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Campaign Date
            </label>
            <Input
              type="date"
              className={fieldClass}
              {...form.register("campaignDate")}
            />
            {form.formState.errors.campaignDate && (
              <p className="text-sm text-danger">
                {form.formState.errors.campaignDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Target Donors
            </label>
            <Input
              type="number"
              min="1"
              placeholder="Maximum number of donors"
              className={fieldClass}
              {...form.register("targetDonors")}
            />
            {form.formState.errors.targetDonors && (
              <p className="text-sm text-danger">
                {form.formState.errors.targetDonors.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Start Time
            </label>
            <Input
              type="time"
              className={fieldClass}
              {...form.register("startTime")}
            />
            {form.formState.errors.startTime && (
              <p className="text-sm text-danger">
                {form.formState.errors.startTime.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              End Time
            </label>
            <Input
              type="time"
              className={fieldClass}
              {...form.register("endTime")}
            />
            {form.formState.errors.endTime && (
              <p className="text-sm text-danger">
                {form.formState.errors.endTime.message}
              </p>
            )}
          </div>
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
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Creating..." : "Create Campaign"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
