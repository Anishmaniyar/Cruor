import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Priority = "High" | "Medium" | "Low";
type Status = "Pending" | "Approved" | "In Progress";

interface BloodRequest {
  id: number;
  patientName: string;
  bloodGroup: string;
  priority: Priority;
  status: Status;
}

const requests: BloodRequest[] = [
  {
    id: 1,
    patientName: "Ananya Verma",
    bloodGroup: "O+",
    priority: "High",
    status: "Pending",
  },
  {
    id: 2,
    patientName: "Rajesh Kumar",
    bloodGroup: "A-",
    priority: "Medium",
    status: "Pending",
  },
  {
    id: 3,
    patientName: "Meera Nair",
    bloodGroup: "B+",
    priority: "High",
    status: "In Progress",
  },
  {
    id: 4,
    patientName: "Sunil Patil",
    bloodGroup: "AB+",
    priority: "Low",
    status: "Pending",
  },
];

const priorityVariant: Record<Priority, "danger" | "secondary" | "outline"> = {
  High: "danger",
  Medium: "secondary",
  Low: "outline",
};

const statusVariant: Record<Status, "success" | "secondary" | "default"> = {
  Pending: "secondary",
  Approved: "success",
  "In Progress": "default",
};

export default function PendingBloodRequests() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="section-title">Pending Blood Requests</h2>
          <p className="section-description">
            Blood requests requiring your attention.
          </p>
        </div>
        <Link
          href="/hospital/requests"
          className="link-action"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {requests.map((req) => (
            <div
              key={req.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-hover"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-sm font-medium text-text-primary">
                {req.patientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {req.patientName}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Badge variant={priorityVariant[req.priority]} className="text-[10px] px-1.5 py-0">
                    {req.priority}
                  </Badge>
                  <Badge variant={statusVariant[req.status]} className="text-[10px] px-1.5 py-0">
                    {req.status}
                  </Badge>
                </div>
              </div>

              {/* Blood Group */}
              <div className="flex h-8 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                {req.bloodGroup}
              </div>

              {/* Review Button */}
              <Link href="/hospital/requests">
                <Button variant="ghost" size="xs" className="gap-1.5">
                  Review
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
