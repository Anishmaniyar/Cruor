// layout component -  how should your auth screen looks
//  it contais the width padding borders shadow spacing

import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  children: ReactNode;
}

export default function AuthCard({ children }: AuthCardProps) {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="p=6">{children}</CardContent>
      </Card>
    </main>
  );
}
