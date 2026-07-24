import { AuthCard } from "@/components/auth/AuthCard";
import LogInForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <AuthCard>
        <LogInForm />
      </AuthCard>
    </main>
  );
}
