"use client";

import Link from "next/link";
import { PageHeader, BackLink } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function BookAppointmentPage() {
  return (
    <>
      <BackLink href="/portal/appointments" />
      <PageHeader label="Schedule" title="Book Appointment" description="Select a date, location, and donation type for your next visit." />
      <Card className="max-w-xl">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <Select label="Location" defaultValue="metro">
            <option value="metro">Metro General — Blood Bank Wing</option>
            <option value="city">City Health Center</option>
          </Select>
          <Select label="Donation Type" defaultValue="whole">
            <option value="whole">Whole Blood</option>
            <option value="platelets">Platelets</option>
            <option value="plasma">Plasma</option>
          </Select>
          <Input label="Preferred Date" type="date" />
          <Select label="Preferred Time" defaultValue="09:00">
            <option value="09:00">9:00 AM</option>
            <option value="10:00">10:00 AM</option>
            <option value="11:00">11:00 AM</option>
            <option value="14:00">2:00 PM</option>
            <option value="15:00">3:00 PM</option>
          </Select>
          <div className="flex gap-3">
            <Button type="submit">Confirm Booking</Button>
            <Link href="/portal/appointments"><Button variant="secondary">Cancel</Button></Link>
          </div>
        </form>
      </Card>
    </>
  );
}
