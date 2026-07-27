import DonorRow from "./DonorRow";
import type { CampaignDonor } from "./DonorRow";

interface RegisteredDonorsTableProps {
  donors: CampaignDonor[];
  onCheckIn?: (id: string) => void;
  onComplete?: (id: string) => void;
  onNoShow?: (id: string) => void;
}

export default function RegisteredDonorsTable({
  donors,
  onCheckIn,
  onComplete,
  onNoShow,
}: RegisteredDonorsTableProps) {
  if (donors.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="card-title mb-4">Registered Donors</h2>

      <div className="overflow-hidden rounded-2xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-surface-secondary">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Donor Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-0">
            {donors.map((donor) => (
              <DonorRow
                key={donor.id}
                donor={donor}
                onCheckIn={onCheckIn}
                onComplete={onComplete}
                onNoShow={onNoShow}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export type { CampaignDonor };
