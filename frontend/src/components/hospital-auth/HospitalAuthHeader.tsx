import { Hospital } from "lucide-react";

interface HospitalAuthHeaderProps {
  title: string;
  description: string;
}

export default function HospitalAuthHeader({
  title,
  description,
}: HospitalAuthHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Branding Badge */}
      <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-border bg-surface-secondary px-4 py-2">
        <Hospital className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-text-secondary">
          Hospital Portal
        </span>
      </div>

      {/* Heading */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-medium tracking-tight text-text-primary">
          {title}
        </h1>
        <p className="text-sm text-text-secondary">{description}</p>
      </div>
    </div>
  );
}
