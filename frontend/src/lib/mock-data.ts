export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Status = "pending" | "confirmed" | "completed" | "cancelled" | "rejected" | "open" | "accepted" | "in-transit" | "delivered";

export const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const donorUser = {
  id: "usr_001",
  name: "Sarah Mitchell",
  email: "sarah.mitchell@email.com",
  phone: "+1 (555) 234-5678",
  bloodGroup: "O+" as BloodGroup,
  address: "742 Evergreen Terrace, Springfield",
  totalDonations: 12,
  lastDonation: "2026-03-15",
  memberSince: "2022-06-10",
};

export const hospitalUser = {
  id: "hsp_001",
  name: "Metro General Hospital",
  email: "bloodbank@metrogeneral.org",
  phone: "+1 (555) 987-6543",
  address: "1200 Medical Center Drive, New York, NY",
  license: "HSP-NY-2024-0892",
};

export const appointments = [
  { id: "apt_001", date: "2026-06-28T09:00:00", location: "Metro General — Blood Bank Wing", status: "confirmed" as Status, type: "Whole Blood" },
  { id: "apt_002", date: "2026-05-10T14:30:00", location: "City Health Center", status: "completed" as Status, type: "Platelets" },
  { id: "apt_003", date: "2026-07-05T10:00:00", location: "Metro General — Blood Bank Wing", status: "pending" as Status, type: "Whole Blood" },
];

export const campaigns = [
  { id: "cmp_001", title: "Summer Blood Drive 2026", location: "Metro General Hospital", startDate: "2026-07-01", endDate: "2026-07-15", slots: 200, registered: 142, status: "active" as const, bloodGroups: ["O+", "O-", "A+"] as BloodGroup[] },
  { id: "cmp_002", title: "Emergency O- Collection", location: "City Health Center", startDate: "2026-06-25", endDate: "2026-06-30", slots: 50, registered: 48, status: "active" as const, bloodGroups: ["O-"] as BloodGroup[] },
  { id: "cmp_003", title: "Community Heroes Week", location: "Downtown Plaza", startDate: "2026-08-01", endDate: "2026-08-07", slots: 500, registered: 89, status: "upcoming" as const, bloodGroups: bloodGroups },
];

export const donations = [
  { id: "don_001", date: "2026-03-15", type: "Whole Blood", volume: "450ml", location: "Metro General Hospital", status: "completed" as Status, bloodGroup: "O+" as BloodGroup, certificateAvailable: true },
  { id: "don_002", date: "2025-12-02", type: "Platelets", volume: "200ml", location: "City Health Center", status: "completed" as Status, bloodGroup: "O+" as BloodGroup, certificateAvailable: true },
  { id: "don_003", date: "2025-08-18", type: "Whole Blood", volume: "450ml", location: "Metro General Hospital", status: "completed" as Status, bloodGroup: "O+" as BloodGroup, certificateAvailable: true },
];

export const notifications = [
  { id: "ntf_001", title: "Appointment Confirmed", message: "Your appointment on Jun 28, 2026 at 9:00 AM has been confirmed.", date: "2026-06-20T10:00:00", read: false, type: "appointment" as const },
  { id: "ntf_002", title: "Campaign Registration", message: "You are registered for Summer Blood Drive 2026.", date: "2026-06-18T14:30:00", read: false, type: "campaign" as const },
  { id: "ntf_003", title: "Donation Certificate Ready", message: "Your certificate for donation DON-001 is available for download.", date: "2026-03-16T09:00:00", read: true, type: "donation" as const },
  { id: "ntf_004", title: "Low Stock Alert", message: "O- blood group is critically low in your region.", date: "2026-06-15T08:00:00", read: true, type: "alert" as const },
];

export const bloodUnits = [
  { id: "bu_001", unitId: "VD-2026-004521", bloodGroup: "O+" as BloodGroup, component: "Whole Blood", volume: "450ml", collectedDate: "2026-06-18", expiryDate: "2026-07-16", status: "available" as const, verified: true, location: "Cold Storage A-12" },
  { id: "bu_002", unitId: "VD-2026-004522", bloodGroup: "O-" as BloodGroup, component: "Whole Blood", volume: "450ml", collectedDate: "2026-06-19", expiryDate: "2026-07-17", status: "reserved" as const, verified: true, location: "Cold Storage A-14" },
  { id: "bu_003", unitId: "VD-2026-004523", bloodGroup: "A+" as BloodGroup, component: "Platelets", volume: "200ml", collectedDate: "2026-06-20", expiryDate: "2026-06-27", status: "available" as const, verified: false, location: "Cold Storage B-03" },
  { id: "bu_004", unitId: "VD-2026-004524", bloodGroup: "B-" as BloodGroup, component: "Plasma", volume: "300ml", collectedDate: "2026-06-10", expiryDate: "2027-06-10", status: "low" as const, verified: true, location: "Cold Storage C-01" },
];

export const inventoryByGroup = [
  { group: "O+" as BloodGroup, units: 142, status: "adequate" as const },
  { group: "O-" as BloodGroup, units: 18, status: "critical" as const },
  { group: "A+" as BloodGroup, units: 89, status: "adequate" as const },
  { group: "A-" as BloodGroup, units: 34, status: "low" as const },
  { group: "B+" as BloodGroup, units: 56, status: "adequate" as const },
  { group: "B-" as BloodGroup, units: 12, status: "critical" as const },
  { group: "AB+" as BloodGroup, units: 28, status: "low" as const },
  { group: "AB-" as BloodGroup, units: 8, status: "critical" as const },
];

export const bloodRequests = [
  { id: "req_001", hospital: "St. Mary's Medical", bloodGroup: "O-" as BloodGroup, units: 4, urgency: "critical" as const, status: "open" as Status, createdAt: "2026-06-21T08:00:00" },
  { id: "req_002", hospital: "Metro General Hospital", bloodGroup: "A+" as BloodGroup, units: 2, urgency: "normal" as const, status: "accepted" as Status, createdAt: "2026-06-20T14:00:00" },
  { id: "req_003", hospital: "Children's Hospital", bloodGroup: "B+" as BloodGroup, units: 3, urgency: "urgent" as const, status: "open" as Status, createdAt: "2026-06-21T06:30:00" },
];

export const transfers = [
  { id: "trf_001", from: "Metro General Hospital", to: "St. Mary's Medical", units: 2, bloodGroup: "O-" as BloodGroup, status: "in-transit" as Status, date: "2026-06-21T10:00:00" },
  { id: "trf_002", from: "City Health Center", to: "Metro General Hospital", units: 5, bloodGroup: "A+" as BloodGroup, status: "delivered" as Status, date: "2026-06-19T15:00:00" },
  { id: "trf_003", from: "Metro General Hospital", to: "Children's Hospital", units: 3, bloodGroup: "B+" as BloodGroup, status: "pending" as Status, date: "2026-06-21T12:00:00" },
];

export const hospitalDonations = [
  { id: "don_004", donor: "James Wilson", date: "2026-06-20", type: "Whole Blood", bloodGroup: "A+" as BloodGroup, status: "pending" as Status },
  { id: "don_005", donor: "Emily Chen", date: "2026-06-19", type: "Platelets", bloodGroup: "O-" as BloodGroup, status: "completed" as Status },
  { id: "don_006", donor: "Robert Garcia", date: "2026-06-18", type: "Whole Blood", bloodGroup: "B+" as BloodGroup, status: "completed" as Status },
];

export const campaignRegistrations = [
  { id: "reg_001", name: "Sarah Mitchell", bloodGroup: "O+" as BloodGroup, registeredAt: "2026-06-15", status: "confirmed" as Status },
  { id: "reg_002", name: "James Wilson", bloodGroup: "A+" as BloodGroup, registeredAt: "2026-06-16", status: "confirmed" as Status },
  { id: "reg_003", name: "Emily Chen", bloodGroup: "O-" as BloodGroup, registeredAt: "2026-06-17", status: "pending" as Status },
];

export const trackingEvents = [
  { id: "evt_001", event: "Collected", location: "Metro General — Collection Room 3", timestamp: "2026-06-18T09:15:00", actor: "Dr. Patel" },
  { id: "evt_002", event: "Lab Testing", location: "Metro General — Hematology Lab", timestamp: "2026-06-18T11:30:00", actor: "Lab Tech — Kim" },
  { id: "evt_003", event: "Verified", location: "Metro General — Quality Control", timestamp: "2026-06-18T14:00:00", actor: "QC — Anderson" },
  { id: "evt_004", event: "Stored", location: "Cold Storage A-12", timestamp: "2026-06-18T14:45:00", actor: "Storage — Rivera" },
];

export const tickerStats = [
  "12,847 UNITS COLLECTED THIS MONTH",
  "O- CRITICALLY LOW — DONATE NOW",
  "48 HOSPITALS CONNECTED",
  "2,341 LIVES SAVED IN 2026",
  "SUMMER BLOOD DRIVE — JUL 1–15",
];

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}
