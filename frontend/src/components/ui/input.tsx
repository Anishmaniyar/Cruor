import { cn } from "@/lib/utils";

export function Input({
  className,
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      <input
        className={cn(
          "border-b-2 border-border bg-transparent px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:bg-muted focus-visible:outline-none focus-visible:border-accent transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function Textarea({
  className,
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "border border-border bg-muted/50 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-accent transition-colors min-h-[100px]",
          className
        )}
        {...props}
      />
    </div>
  );
}

export function Select({
  className,
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </label>
      )}
      <select
        className={cn(
          "border-b-2 border-border bg-transparent px-3 py-2 font-mono text-sm text-foreground focus-visible:bg-muted focus-visible:outline-none focus-visible:border-accent transition-colors",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
