"use client";

import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import { useCurrentHospital } from "@/lib/use-current-hospital";
import { updateHospitalProfile, type CurrentHospital } from "@/services/auth.services";
import { getErrorMessage } from "@/lib/error";

const fieldClass =
  "h-10 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40";

interface HospitalFormProps {
  hospital: CurrentHospital;
  onSaved: () => void;
}

function HospitalForm({ hospital, onSaved }: HospitalFormProps) {
  const [form, setForm] = useState({
    name: hospital.name,
    email: hospital.email,
    phoneNo: hospital.phoneNo ?? "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setSaving(true);
      await updateHospitalProfile(hospital.id, {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phoneNo: form.phoneNo.trim() || undefined,
      });

      toast.success("Hospital profile updated successfully");
      onSaved();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to update profile"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
            <Building2 size={14} /> Hospital Name
          </label>
          <Input
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
            className={fieldClass}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
            <Mail size={14} /> Email Address
          </label>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            className={fieldClass}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-text-muted">
            <Phone size={14} /> Phone Number
          </label>
          <Input
            type="tel"
            value={form.phoneNo}
            onChange={(e) => setForm((prev) => ({ ...prev, phoneNo: e.target.value }))}
            className={fieldClass}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={saving} className="gap-2">
        {saving ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Saving...
          </>
        ) : (
          "Update Profile"
        )}
      </Button>
    </form>
  );
}

export default function ProfileInformation() {
  const { hospital, loading, error, refetch } = useCurrentHospital();

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !hospital) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-text-secondary">
          {error ?? "Failed to load hospital profile."}
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-surface-hover ring-2 ring-border">
          <Building2 size={40} className="text-text-muted" />
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {hospital.name}
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Hospital ID: {hospital.id}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="h-6 gap-1 px-3">
              <FileText size={12} />
              Reg ID: {hospital.registrationId}
            </Badge>
          </div>
        </div>
      </div>

      {/* Read-only fields returned by GET /auth/hospital-me */}
      <div className="divide-y divide-border/50 rounded-2xl border border-border bg-surface">
        <div className="flex items-center gap-3 px-4 py-3">
          <MapPin size={16} className="shrink-0 text-text-muted" />
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
              Address
            </p>
            <p className="text-base font-medium text-text-primary">
              {hospital.address || "—"}
            </p>
          </div>
        </div>
      </div>

      {/* Editable fields (updatable via PATCH /hospitals/:id) */}
      <HospitalForm key={hospital.id} hospital={hospital} onSaved={refetch} />
    </div>
  );
}
