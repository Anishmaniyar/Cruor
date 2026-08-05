import { Building2 } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthSwitchCard, AuthPageLink } from "@/components/auth/AuthSwitchCard";
import SignUpForm from "@/components/auth/SignupForm";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6 py-12">
      <ThemeToggle className="fixed right-6 top-6 z-50" />
      <div className="w-full max-w-md space-y-6">
        <AuthCard>
          <SignUpForm />
        </AuthCard>

        <AuthPageLink
          label="Already have an account?"
          linkLabel="Login as Donor"
          linkHref="/login"
        />

        <AuthSwitchCard
          icon={Building2}
          title="Registering as a Hospital?"
          description="Manage appointments, campaigns, blood inventory, and blood requests through the Hospital Portal."
          buttonLabel="Sign Up as Hospital"
          buttonHref="/hospital/register"
        />
      </div>
    </main>
  );
}
