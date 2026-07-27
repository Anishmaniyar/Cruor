"use client";

import { useState, useRef } from "react";
import {
  User,
  Pencil,
  Check,
  X,
  Camera,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Droplets,
  Award,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/* ─── Editable Field ─── */

interface EditableFieldProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  type?: string;
}

function EditableField({ label, value, icon, type = "text" }: EditableFieldProps) {
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
              type={type}
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

/* ─── Profile Picture ─── */

function ProfilePicture() {
  const [hovering, setHovering] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <div
        className="relative"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-surface-hover ring-2 ring-border">
          {preview ? (
            <img src={preview} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <User size={40} className="text-text-muted" />
          )}
        </div>

        {/* Upload overlay */}
        <button
          onClick={() => inputRef.current?.click()}
          className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/50 transition-opacity ${
            hovering ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Upload profile photo"
        >
          <Camera size={22} className="text-white" />
        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex flex-col items-center sm:items-start">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">George Anderson</h2>
          <Badge variant="secondary" className="h-5 text-[10px]">Donor since 2024</Badge>
        </div>
        <p className="mt-1 text-sm text-text-secondary">Donor ID: VD-1024</p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge variant="default" className="h-6 gap-1 px-3">
            <Droplets size={12} />
            O+
          </Badge>
          <Badge variant="success" className="h-6 gap-1 px-3">
            <ShieldCheck size={12} />
            Verified
          </Badge>
          <Badge variant="secondary" className="h-6 gap-1 px-3">
            <Award size={12} />
            Active Donor
          </Badge>
        </div>

        <Button
          variant="ghost"
          size="xs"
          className="mt-3"
          onClick={() => inputRef.current?.click()}
        >
          <Camera size={14} />
          Change photo
        </Button>
      </div>
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

export default function ProfileOverview() {
  return (
    <div className="space-y-8">
      {/* Profile Picture & Name Section */}
      <ProfilePicture />

      {/* Personal Details */}
      <SectionDivider label="Personal Details" />
      <div className="divide-y divide-border/50 rounded-2xl border border-border bg-surface">
        <EditableField
          label="Full Name"
          value="George Anderson"
        />
        <EditableField
          label="Email"
          value="george.anderson@email.com"
          type="email"
          icon={<Mail size={16} />}
        />
        <EditableField
          label="Phone Number"
          value="+91 98765 43210"
          type="tel"
          icon={<Phone size={16} />}
        />
        <EditableField
          label="Date of Birth"
          value="15 March 1995"
          icon={<Calendar size={16} />}
        />
        <EditableField
          label="Gender"
          value="Male"
        />
        <EditableField
          label="Address"
          value="123 MG Road, Shivajinagar, Pune"
          icon={<MapPin size={16} />}
        />
      </div>

      {/* Account Info */}
      <SectionDivider label="Account Information" />
      <div className="divide-y divide-border/50 rounded-2xl border border-border bg-surface">
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm text-text-secondary">Member Since</p>
          <p className="text-sm font-medium text-text-primary">January 2024</p>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm text-text-secondary">Total Donations</p>
          <p className="text-sm font-medium text-text-primary">12</p>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm text-text-secondary">Last Donation</p>
          <p className="text-sm font-medium text-text-primary">12 June 2026</p>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-sm text-text-secondary">Next Eligible</p>
          <p className="text-sm font-medium text-success">12 September 2026</p>
        </div>
      </div>
    </div>
  );
}
