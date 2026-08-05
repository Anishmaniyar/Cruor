import { Droplets } from "lucide-react";
import HospitalIllustration from "@/components/hospital-auth/HospitalIllustration";
import { HospitalAuthCard } from "@/components/hospital-auth/HospitalAuthCard";
import { AuthSwitchCard, AuthPageLink } from "@/components/auth/AuthSwitchCard";
import HospitalRegisterForm from "@/components/hospital-auth/HospitalRegisterForm";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function HospitalRegisterPage() {
  return (
    <main className="flex min-h-screen w-full">
      <ThemeToggle className="fixed right-6 top-6 z-50" />
      {/* Left — Branding / Illustration */}
      <HospitalIllustration />

      {/* Right — Authentication Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <HospitalAuthCard>
            <HospitalRegisterForm />
          </HospitalAuthCard>

          <AuthPageLink
            label="Already have a hospital account?"
            linkLabel="Login as Hospital"
            linkHref="/hospital/login"
          />

          <AuthSwitchCard
            icon={Droplets}
            title="Want to Donate Blood Instead?"
            description="Create a donor account to book appointments, join campaigns, and track your donations."
            buttonLabel="Sign Up as Donor"
            buttonHref="/signup"
          />
        </div>
      </div>
    </main>
  );
}
