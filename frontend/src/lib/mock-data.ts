export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type Status = "pending" | "confirmed" | "completed" | "cancelled" | "rejected" | "open" | "accepted" | "in-transit" | "delivered";

export type BloodUnitLifecycleState =
  | "COLLECTED"
  | "VERIFIED"
  | "STORED"
  | "RESERVED"
  | "TRANSFERRED"
  | "USED"
  | "EXPIRED"
  | "REJECTED";

export type AuditEntry = {
  id: string;
  action: string;
  detail: string;
  actor: string;
  timestamp: string;
  previousStatus?: string;
  newStatus?: string;
};

export const bloodGroups: BloodGroup[] = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const donorUser = {
  id: "usr_001",
  name: "Priya Venkatesh",
  email: "priya.venkatesh@mail.io",
  phone: "+1 (312) 847-1928",
  bloodGroup: "O+" as BloodGroup,
  address: "418 W Belmont Ave, Chicago, IL",
  totalDonations: 11,
  lastDonation: "2026-03-15",
  memberSince: "2022-06-10",
};

export const hospitalUser = {
  id: "hsp_001",
  name: "Northside Hematology Center",
  email: "bloodbank@northsidehem.org",
  phone: "+1 (646) 291-4407",
  address: "880 Madison Ave, New York, NY",
  license: "HSP-NY-2024-0892",
};

export const appointments = [
  { id: "apt_001", date: "2026-06-28T09:00:00", location: "Northside — Collection Unit 2", status: "confirmed" as Status, type: "Whole Blood" },
  { id: "apt_002", date: "2026-05-10T14:30:00", location: "Riverside Donor Clinic", status: "completed" as Status, type: "Platelets" },
  { id: "apt_003", date: "2026-07-05T10:00:00", location: "Northside — Collection Unit 2", status: "pending" as Status, type: "Whole Blood" },
];

export const campaigns = [
  { id: "cmp_001", title: "Regional O- Response Drive", location: "Northside Hematology Center", startDate: "2026-07-01", endDate: "2026-07-15", slots: 200, registered: 137, status: "active" as const, bloodGroups: ["O+", "O-", "A+"] as BloodGroup[] },
  { id: "cmp_002", title: "Emergency O- Collection", location: "Riverside Donor Clinic", startDate: "2026-06-25", endDate: "2026-06-30", slots: 50, registered: 43, status: "active" as const, bloodGroups: ["O-"] as BloodGroup[] },
  { id: "cmp_003", title: "Summer Donor Week", location: "Civic Center Plaza", startDate: "2026-08-01", endDate: "2026-08-07", slots: 500, registered: 82, status: "upcoming" as const, bloodGroups: bloodGroups },
];

export const donations = [
  { id: "don_001", date: "2026-03-15", type: "Whole Blood", volume: "450ml", location: "Northside Hematology Center", status: "completed" as Status, bloodGroup: "O+" as BloodGroup, certificateAvailable: true },
  { id: "don_002", date: "2025-12-02", type: "Platelets", volume: "200ml", location: "Riverside Donor Clinic", status: "completed" as Status, bloodGroup: "O+" as BloodGroup, certificateAvailable: true },
  { id: "don_003", date: "2025-08-18", type: "Whole Blood", volume: "450ml", location: "Northside Hematology Center", status: "completed" as Status, bloodGroup: "O+" as BloodGroup, certificateAvailable: true },
];

export const notifications = [
  { id: "ntf_001", title: "Appointment confirmed", message: "Your Jun 28 appointment at 9:00 AM is confirmed at Northside Collection Unit 2.", date: "2026-06-20T10:00:00", read: false, type: "appointment" as const },
  { id: "ntf_002", title: "Campaign registration saved", message: "You are registered for Regional O- Response Drive.", date: "2026-06-18T14:30:00", read: false, type: "campaign" as const },
  { id: "ntf_003", title: "Certificate ready", message: "Download certificate for donation DON-001.", date: "2026-03-16T09:00:00", read: true, type: "donation" as const },
  { id: "ntf_004", title: "O- stock alert", message: "O- inventory is below threshold in your region.", date: "2026-06-15T08:00:00", read: true, type: "alert" as const },
];

export const bloodUnits = [
  { id: "bu_001", unitId: "VD-2026-004521", bloodGroup: "O+" as BloodGroup, component: "Whole Blood", volume: "450ml", collectedDate: "2026-06-18", expiryDate: "2026-07-16", lifecycle: "STORED" as BloodUnitLifecycleState, previousLifecycle: "VERIFIED" as BloodUnitLifecycleState, verified: true, location: "Cold Storage A-12" },
  { id: "bu_002", unitId: "VD-2026-004522", bloodGroup: "O-" as BloodGroup, component: "Whole Blood", volume: "450ml", collectedDate: "2026-06-19", expiryDate: "2026-07-17", lifecycle: "RESERVED" as BloodUnitLifecycleState, previousLifecycle: "STORED" as BloodUnitLifecycleState, verified: true, location: "Cold Storage A-14" },
  { id: "bu_003", unitId: "VD-2026-004523", bloodGroup: "A+" as BloodGroup, component: "Platelets", volume: "200ml", collectedDate: "2026-06-20", expiryDate: "2026-06-27", lifecycle: "COLLECTED" as BloodUnitLifecycleState, previousLifecycle: undefined, verified: false, location: "Processing Bay B-03" },
  { id: "bu_004", unitId: "VD-2026-004524", bloodGroup: "B-" as BloodGroup, component: "Plasma", volume: "300ml", collectedDate: "2026-06-10", expiryDate: "2027-06-10", lifecycle: "TRANSFERRED" as BloodUnitLifecycleState, previousLifecycle: "STORED" as BloodUnitLifecycleState, verified: true, location: "In transit to St. Alden Medical" },
];

export const inventoryByGroup = [
  { group: "O+" as BloodGroup, units: 138, status: "adequate" as const },
  { group: "O-" as BloodGroup, units: 17, status: "critical" as const },
  { group: "A+" as BloodGroup, units: 91, status: "adequate" as const },
  { group: "A-" as BloodGroup, units: 31, status: "low" as const },
  { group: "B+" as BloodGroup, units: 54, status: "adequate" as const },
  { group: "B-" as BloodGroup, units: 11, status: "critical" as const },
  { group: "AB+" as BloodGroup, units: 26, status: "low" as const },
  { group: "AB-" as BloodGroup, units: 7, status: "critical" as const },
];

export const bloodRequests = [
  { id: "req_001", hospital: "St. Alden Medical", bloodGroup: "O-" as BloodGroup, units: 4, urgency: "critical" as const, status: "open" as Status, createdAt: "2026-06-21T08:00:00" },
  { id: "req_002", hospital: "Northside Hematology Center", bloodGroup: "A+" as BloodGroup, units: 2, urgency: "normal" as const, status: "accepted" as Status, createdAt: "2026-06-20T14:00:00" },
  { id: "req_003", hospital: "Mercy Children's", bloodGroup: "B+" as BloodGroup, units: 3, urgency: "urgent" as const, status: "open" as Status, createdAt: "2026-06-21T06:30:00" },
];

export const transfers = [
  { id: "trf_001", from: "Northside Hematology Center", to: "St. Alden Medical", units: 2, bloodGroup: "O-" as BloodGroup, status: "in-transit" as Status, date: "2026-06-21T10:00:00" },
  { id: "trf_002", from: "Riverside Donor Clinic", to: "Northside Hematology Center", units: 5, bloodGroup: "A+" as BloodGroup, status: "delivered" as Status, date: "2026-06-19T15:00:00" },
  { id: "trf_003", from: "Northside Hematology Center", to: "Mercy Children's", units: 3, bloodGroup: "B+" as BloodGroup, status: "pending" as Status, date: "2026-06-21T12:00:00" },
];

export const hospitalDonations = [
  { id: "don_004", donor: "Marcus Okafor", date: "2026-06-20", type: "Whole Blood", bloodGroup: "A+" as BloodGroup, status: "pending" as Status },
  { id: "don_005", donor: "Elena Rostova", date: "2026-06-19", type: "Platelets", bloodGroup: "O-" as BloodGroup, status: "completed" as Status },
  { id: "don_006", donor: "Tomás Herrera", date: "2026-06-18", type: "Whole Blood", bloodGroup: "B+" as BloodGroup, status: "completed" as Status },
];

export const campaignRegistrations = [
  { id: "reg_001", name: "Priya Venkatesh", bloodGroup: "O+" as BloodGroup, registeredAt: "2026-06-15", status: "confirmed" as Status },
  { id: "reg_002", name: "Marcus Okafor", bloodGroup: "A+" as BloodGroup, registeredAt: "2026-06-16", status: "confirmed" as Status },
  { id: "reg_003", name: "Elena Rostova", bloodGroup: "O-" as BloodGroup, registeredAt: "2026-06-17", status: "pending" as Status },
];

export const trackingEvents = [
  { id: "evt_001", event: "COLLECTED", location: "Northside — Collection Room 3", timestamp: "2026-06-18T09:15:00", actor: "Dr. Anika Patel" },
  { id: "evt_002", event: "VERIFIED", location: "Northside — Hematology Lab", timestamp: "2026-06-18T14:00:00", actor: "QC — L. Anderson" },
  { id: "evt_003", event: "STORED", location: "Cold Storage A-12", timestamp: "2026-06-18T14:45:00", actor: "Storage — M. Rivera" },
];

export const auditLogs: Record<string, AuditEntry[]> = {
  apt_001: [
    { id: "aud_001", action: "Appointment booked", detail: "Whole Blood appointment scheduled.", actor: "Priya Venkatesh", timestamp: "2026-06-10T11:20:00", newStatus: "pending" },
    { id: "aud_002", action: "Appointment confirmed", detail: "Confirmed by hospital staff.", actor: "N. Brooks", timestamp: "2026-06-20T10:00:00", previousStatus: "pending", newStatus: "confirmed" },
  ],
  apt_003: [
    { id: "aud_003", action: "Appointment booked", detail: "Awaiting hospital confirmation.", actor: "Priya Venkatesh", timestamp: "2026-06-19T16:40:00", newStatus: "pending" },
  ],
  bu_001: [
    { id: "aud_004", action: "Unit collected", detail: "450ml whole blood collected.", actor: "Dr. Anika Patel", timestamp: "2026-06-18T09:15:00", newStatus: "COLLECTED" },
    { id: "aud_005", action: "Verification passed", detail: "All QC checks passed.", actor: "L. Anderson", timestamp: "2026-06-18T14:00:00", previousStatus: "COLLECTED", newStatus: "VERIFIED" },
    { id: "aud_006", action: "Unit stored", detail: "Placed in Cold Storage A-12.", actor: "M. Rivera", timestamp: "2026-06-18T14:45:00", previousStatus: "VERIFIED", newStatus: "STORED" },
  ],
  req_001: [
    { id: "aud_007", action: "Request submitted", detail: "4 units O- requested for emergency case.", actor: "St. Alden Medical", timestamp: "2026-06-21T08:00:00", newStatus: "open" },
  ],
  trf_001: [
    { id: "aud_008", action: "Transfer approved", detail: "2 units O- dispatched.", actor: "N. Brooks", timestamp: "2026-06-21T10:00:00", previousStatus: "pending", newStatus: "in-transit" },
  ],
  don_004: [
    { id: "aud_009", action: "Donation recorded", detail: "Awaiting processing completion.", actor: "Collection Desk", timestamp: "2026-06-20T11:05:00", newStatus: "pending" },
  ],
};

export const tickerStats = [
  "O- BELOW THRESHOLD IN 3 FACILITIES",
  "17 UNITS O- REMAINING REGION-WIDE",
  "2 OPEN TRANSFER REQUESTS",
  "6 APPOINTMENTS AWAITING CONFIRMATION",
  "REGIONAL O- RESPONSE DRIVE JUL 1-15",
];

export function getById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find((item) => item.id === id);
}

export function getAuditLog(id: string): AuditEntry[] {
  return auditLogs[id] ?? [];
}
