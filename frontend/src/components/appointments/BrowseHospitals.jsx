const hospitals = [
  {
    id: "ruby-hall",
    name: "Ruby Hall Clinic",
    location: "Shivajinagar, Pune",
    rating: 4.8,
    workingHours: "8 AM - 5 PM",
    donationType: "Whole Blood",
    availableSlots: 18,
  },
  {
    id: "sassoon",
    name: "Sassoon General Hospital",
    location: "Pune",
    rating: 4.6,
    workingHours: "9 AM - 4 PM",
    donationType: "Whole Blood",
    availableSlots: 12,
  },
];

import HospitalCard from "./HospitalCard";

export default function BrowseHospital() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {hospitals.map((hospital) => (
        <HospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </section>
  );
}
