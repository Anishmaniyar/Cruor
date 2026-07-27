import HospitalIllustration from "@/components/hospital-auth/HospitalIllustration";
import { HospitalAuthCard } from "@/components/hospital-auth/HospitalAuthCard";
import HospitalRegisterForm from "@/components/hospital-auth/HospitalRegisterForm";

export default function HospitalRegisterPage() {
  return (
    <main className="flex min-h-screen w-full">
      {/* Left — Branding / Illustration */}
      <HospitalIllustration />

      {/* Right — Authentication Form */}
      <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
        <HospitalAuthCard>
          <HospitalRegisterForm />
        </HospitalAuthCard>
      </div>
    </main>
  );
}
