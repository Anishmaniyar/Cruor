import { cn } from "@/lib/utils";

export function Input({
  className,
  label,
  helperText,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  helperText?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}
      <input
        className={cn(
          "border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/30 transition-colors",
          error && "border-accent",
          className
        )}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        {...props}
      />
      {helperText && !error && (
        <p id={`${props.id}-helper`} className="text-xs text-muted-foreground">{helperText}</p>
      )}
      {error && (
        <p id={`${props.id}-error`} className="text-xs text-accent" role="alert">{error}</p>
      )}
    </div>
  );
}

export function Textarea({
  className,
  label,
  helperText,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; helperText?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          "border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-accent focus-visible:outline-none min-h-[100px]",
          className
        )}
        {...props}
      />
      {helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
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
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </label>
      )}
      <select
        className={cn(
          "border border-border bg-muted/40 px-3 py-2.5 text-sm text-foreground focus-visible:border-accent focus-visible:outline-none",
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}
