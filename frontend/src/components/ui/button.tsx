import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary-cta text-primary-cta-foreground hover:bg-primary-cta/90",
        secondary:
          "bg-surface border border-border text-text-primary hover:border-border-light hover:bg-surface-hover",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
      },
      size: {
        default: "h-10 px-5 gap-2",
        sm: "h-9 px-4 gap-1.5",
        xs: "h-8 px-3 gap-1 text-xs",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    variant?: "primary" | "secondary" | "ghost";
    size?: "default" | "sm" | "xs" | "icon";
  };

function Button({
  className,
  variant = "primary",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
