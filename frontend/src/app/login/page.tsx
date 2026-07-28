import { Building2 } from "lucide-react";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthSwitchCard, AuthPageLink } from "@/components/auth/AuthSwitchCard";
import LogInForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-6">
        <AuthCard>
          <LogInForm />
        </AuthCard>

        <AuthPageLink
          label="Don&apos;t have a donor account?"
          linkLabel="Sign Up as Donor"
          linkHref="/signup"
        />

        <AuthSwitchCard
          icon={Building2}
          title="Looking for the Hospital Portal?"
          description="Access hospital management tools, appointments, inventory, and campaigns."
          buttonLabel="Login as Hospital"
          buttonHref="/hospital/login"
        />
      </div>
    </main>
  );
}
