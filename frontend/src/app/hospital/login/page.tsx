import { Droplets } from "lucide-react";
import HospitalIllustration from "@/components/hospital-auth/HospitalIllustration";
import { HospitalAuthCard } from "@/components/hospital-auth/HospitalAuthCard";
import { AuthSwitchCard, AuthPageLink } from "@/components/auth/AuthSwitchCard";
import HospitalLoginForm from "@/components/hospital-auth/HospitalLoginForm";

export default function HospitalLoginPage() {
  return (
    <main className="flex min-h-screen w-full">
      {/* Left — Branding / Illustration */}
      <HospitalIllustration />

      {/* Right — Authentication Form */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-md space-y-6">
          <HospitalAuthCard>
            <HospitalLoginForm />
          </HospitalAuthCard>

          <AuthPageLink
            label="Don&apos;t have a hospital account?"
            linkLabel="Sign Up as Hospital"
            linkHref="/hospital/register"
          />

          <AuthSwitchCard
            icon={Droplets}
            title="Looking to Donate Blood?"
            description="Access the donor portal to book appointments, join donation campaigns, and manage your profile."
            buttonLabel="Login as Donor"
            buttonHref="/login"
          />
        </div>
      </div>
    </main>
  );
}
