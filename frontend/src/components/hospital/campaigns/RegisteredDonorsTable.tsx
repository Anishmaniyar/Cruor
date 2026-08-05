import DonorRow from "./DonorRow";
import type { CampaignDonor } from "./DonorRow";

interface RegisteredDonorsTableProps {
  donors: CampaignDonor[];
  onRecord?: (registrationId: string, donorName: string) => void;
}

export default function RegisteredDonorsTable({
  donors,
  onRecord,
}: RegisteredDonorsTableProps) {
  if (donors.length === 0) {
    return (
      <div>
        <h2 className="card-title mb-4">Registered Donors</h2>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">
            No donors have registered for this campaign yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="card-title mb-4">Registered Donors</h2>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-secondary">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Donor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Registered On
              </th>
              {onRecord && (
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {donors.map((donor) => (
              <DonorRow key={donor.id} donor={donor} onRecord={onRecord} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type { CampaignDonor };
