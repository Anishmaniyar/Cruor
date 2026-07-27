"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserType } from "@/lib/auth-context";

interface ProtectedRouteProps {
  children: ReactNode;
  userType?: UserType;
  loginHref?: string;
}

export default function ProtectedRoute({
  children,
  userType,
  loginHref,
}: ProtectedRouteProps) {
  const { isAuthenticated, userType: currentUserType } = useAuth();
  const router = useRouter();

  const redirectTo = loginHref ?? (userType === "hospital" ? "/hospital/login" : "/login");

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(redirectTo);
      return;
    }

    // If a specific userType is required, check it
    if (userType && currentUserType !== userType) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, currentUserType, userType, redirectTo, router]);

  if (!isAuthenticated || (userType && currentUserType !== userType)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
