import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans text-xs font-medium uppercase tracking-widest transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 min-h-[44px] px-6",
  {
    variants: {
      variant: {
        primary: "bg-accent text-foreground border border-accent hover:bg-transparent hover:text-accent",
        secondary: "border border-border bg-transparent text-foreground hover:bg-foreground hover:text-background hover:border-foreground",
        ghost: "hover:bg-muted text-foreground",
        danger: "bg-accent/10 border border-accent text-accent hover:bg-accent hover:text-foreground",
        link: "text-foreground underline-offset-4 decoration-2 decoration-accent hover:underline min-h-0 px-0",
      },
      size: {
        default: "px-6 py-3",
        sm: "px-4 py-2 text-[10px] min-h-[36px]",
        lg: "px-8 py-4",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

export { buttonVariants };
