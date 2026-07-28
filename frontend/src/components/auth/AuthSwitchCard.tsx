import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface AuthSwitchCardProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  className?: string;
}

export function AuthSwitchCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  buttonHref,
  className,
}: AuthSwitchCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface p-6 text-center mt-6",
        className,
      )}
    >
      {Icon && (
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      )}
      <h3 className="text-base font-semibold text-text-primary">{title}</h3>
      <p className="mt-1 text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
      <Link href={buttonHref} className="mt-4 inline-block">
        <Button variant="primary" size="sm">
          {buttonLabel}
        </Button>
      </Link>
    </div>
  );
}

interface AuthPageLinkProps {
  label: string;
  linkLabel: string;
  linkHref: string;
}

export function AuthPageLink({ label, linkLabel, linkHref }: AuthPageLinkProps) {
  return (
    <p className="text-center text-sm text-text-secondary">
      {label}{" "}
      <Link
        href={linkHref}
        className="font-medium text-primary hover:text-primary/80 transition-colors"
      >
        {linkLabel}
      </Link>
    </p>
  );
}
