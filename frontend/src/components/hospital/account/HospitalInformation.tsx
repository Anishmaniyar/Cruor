"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  PhoneCall,
  Clock,
  Pencil,
  Check,
  X,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

/* ─── Editable Info Row ─── */

interface EditableInfoProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function EditableInfo({ label, value, icon }: EditableInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [saved, setSaved] = useState(value);

  const handleSave = () => {
    setSaved(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(saved);
    setIsEditing(false);
  };

  return (
    <div className="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 transition-colors hover:bg-surface-hover/50">
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>

        {isEditing ? (
          <div className="mt-1.5 flex items-center gap-2">
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="h-10"
              autoFocus
            />
            <button
              onClick={handleSave}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success/10 text-success transition-colors hover:bg-success/20"
              aria-label="Save"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancel}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-text-secondary transition-colors hover:text-text-primary"
              aria-label="Cancel"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="mt-1 flex items-center gap-2">
            {icon && <span className="shrink-0 text-text-muted">{icon}</span>}
            <span className="text-base font-medium text-text-primary">{saved}</span>
          </div>
        )}
      </div>

      {!isEditing && (
        <button
          onClick={() => {
            setDraft(saved);
            setIsEditing(true);
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-text-muted opacity-0 transition-all group-hover:opacity-100 hover:bg-surface-hover hover:text-text-primary"
          aria-label={`Edit ${label}`}
        >
          <Pencil size={14} />
        </button>
      )}
    </div>
  );
}

/* ─── Divider ─── */

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 px-4">
      <span className="text-xs font-medium uppercase tracking-widest text-text-muted">{label}</span>
      <div className="flex-1 border-t border-border" />
    </div>
  );
}

/* ─── Main Component ─── */

export default function HospitalInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospital Information</CardTitle>
        <CardDescription>
          Manage the information visible to donors and the public.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border/50 rounded-2xl border border-border bg-surface">
          <EditableInfo
            label="Hospital Name"
            value="City Hospital, Pune"
            icon={<Building2 size={16} />}
          />
          <EditableInfo
            label="Hospital Address"
            value="123 MG Road, Shivajinagar, Pune"
            icon={<MapPin size={16} />}
          />
          <EditableInfo
            label="Contact Number"
            value="+91 20 1234 5678"
            icon={<Phone size={16} />}
          />
          <EditableInfo
            label="Emergency Contact"
            value="+91 20 9876 5432"
            icon={<PhoneCall size={16} />}
          />
          <EditableInfo
            label="Operating Hours"
            value="Mon–Sat: 8:00 AM – 8:00 PM | Sun: 9:00 AM – 2:00 PM"
            icon={<Clock size={16} />}
          />
        </div>

        <SectionDivider label="About Hospital" />
        <div className="mt-4 space-y-2">
          <p className="text-sm text-text-secondary">
            City Hospital is a leading multi-specialty healthcare institution in Pune, committed to
            providing quality medical care and community health services. We partner with Vital Drops
            to organize regular blood donation camps and maintain a reliable blood supply for
            emergency and surgical needs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
