import type { CampaignRegistrationDonor } from "@/lib/campaign-utils";

function formatRegisteredAt(value: string): string {
  if (!value) return "—";
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export type CampaignDonor = CampaignRegistrationDonor["user"] & {
  registeredAt: string;
  registrationId: string;
};

interface DonorRowProps {
  donor: CampaignDonor;
  onRecord?: (registrationId: string, donorName: string) => void;
}

export default function DonorRow({ donor, onRecord }: DonorRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-xs font-medium text-text-primary">
            {donor.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary">
              {donor.name}
            </span>
            <p className="text-xs text-text-muted font-mono">
              {donor.id.slice(0, 12)}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {donor.bloodGroup ?? "—"}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {donor.phoneNo ?? "—"}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {formatRegisteredAt(donor.registeredAt)}
      </td>
      {onRecord && (
        <td className="px-6 py-4 text-right">
          <button
            onClick={() => onRecord(donor.registrationId, donor.name)}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
          >
            Record Donation
          </button>
        </td>
      )}
    </tr>
  );
}
