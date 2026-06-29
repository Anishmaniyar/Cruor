"use client";

import { Button } from "@/components/ui/button";
import type { Status } from "@/lib/mock-data";

export function AppointmentActions({ status }: { status: Status }) {
  if (status === "completed" || status === "cancelled" || status === "rejected") {
    return <p className="text-sm text-muted-foreground">No actions available. Record is read-only.</p>;
  }

  if (status === "pending") {
    return (
      <div className="flex flex-wrap gap-3">
        <Button>Confirm</Button>
        <Button variant="danger">Reject</Button>
      </div>
    );
  }

  if (status === "confirmed") {
    return (
      <div className="flex flex-wrap gap-3">
        <Button>Mark Complete</Button>
        <Button variant="danger">Reject</Button>
      </div>
    );
  }

  return null;
}

export function DonorAppointmentActions({ status }: { status: Status }) {
  if (status === "completed" || status === "cancelled" || status === "rejected") {
    return <p className="text-sm text-muted-foreground">This appointment is closed.</p>;
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="danger">Cancel Appointment</Button>
    </div>
  );
}

export function DonationReviewActions({ status }: { status: Status }) {
  if (status === "completed" || status === "rejected") {
    return <p className="text-sm text-muted-foreground">Donation record is read-only.</p>;
  }

  if (status === "pending") {
    return (
      <div className="flex flex-wrap gap-3">
        <Button>Mark Complete</Button>
        <Button variant="danger">Reject</Button>
      </div>
    );
  }

  return null;
}

export function TransferActions({ status }: { status: Status }) {
  if (status === "delivered") {
    return <p className="text-sm text-muted-foreground">Transfer completed. No further actions.</p>;
  }

  if (status === "pending") {
    return <Button>Approve Transfer</Button>;
  }

  if (status === "accepted") {
    return <Button>Mark In Transit</Button>;
  }

  if (status === "in-transit") {
    return <Button>Mark Delivered</Button>;
  }

  return null;
}

export function RequestActions({ status }: { status: Status }) {
  if (status === "open") {
    return (
      <div className="flex flex-wrap gap-3">
        <Button>Accept Request</Button>
        <Button variant="danger">Reject</Button>
      </div>
    );
  }

  if (status === "accepted") {
    return <Button variant="danger">Cancel Request</Button>;
  }

  return <p className="text-sm text-muted-foreground">Request is closed.</p>;
}
