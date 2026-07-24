import SignUpForm from "@/components/auth/SignupForm";
import { AuthCard } from "@/components/auth/AuthCard";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-6">
      <AuthCard>
        <SignUpForm />
      </AuthCard>
    </main>
  );
}
