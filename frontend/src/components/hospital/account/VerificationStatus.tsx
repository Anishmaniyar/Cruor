"use client";

import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface VerificationStatusProps {
  isVerified: boolean;
  rejectionReason?: string;
}

export default function VerificationStatus({ isVerified, rejectionReason }: VerificationStatusProps) {
  const status = isVerified
    ? "verified"
    : rejectionReason
    ? "rejected"
    : "pending";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
        <CardDescription>
          Your hospital account verification status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-xl border border-border bg-surface-secondary p-6">
          {status === "verified" && (
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-success/10">
                <CheckCircle2 className="h-6 w-6 text-success" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-text-primary">Verified</h3>
                  <Badge variant="success" className="h-5 text-[10px]">Approved</Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  Your hospital has been successfully verified. All features are now available.
                </p>
              </div>
            </div>
          )}

          {status === "pending" && (
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-text-primary">Pending Verification</h3>
                  <Badge variant="secondary" className="h-5 text-[10px]">In Review</Badge>
                </div>
                <p className="mt-2 text-sm text-text-secondary">
                  Your account is awaiting administrator approval. This usually takes 1–2 business
                  days. You will be notified once the verification is complete.
                </p>
              </div>
            </div>
          )}

          {status === "rejected" && (
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-danger/10">
                <XCircle className="h-6 w-6 text-danger" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-text-primary">Verification Rejected</h3>
                  <Badge variant="danger" className="h-5 text-[10px]">Rejected</Badge>
                </div>
                {rejectionReason && (
                  <div className="mt-3 rounded-lg bg-danger/5 px-4 py-3">
                    <p className="text-xs font-medium uppercase tracking-wider text-danger">Reason</p>
                    <p className="mt-1 text-sm text-text-secondary">{rejectionReason}</p>
                  </div>
                )}
                <p className="mt-3 text-sm text-text-secondary">
                  Please update your information and submit for re-verification.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
