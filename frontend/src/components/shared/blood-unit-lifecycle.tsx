import { CheckCircle, Circle, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { BloodUnitLifecycleState } from "@/lib/mock-data";

const lifecycleOrder: BloodUnitLifecycleState[] = [
  "COLLECTED",
  "VERIFIED",
  "STORED",
  "RESERVED",
  "TRANSFERRED",
  "USED",
];

const terminalStates: BloodUnitLifecycleState[] = ["EXPIRED", "REJECTED"];

const labels: Record<BloodUnitLifecycleState, string> = {
  COLLECTED: "Collected",
  VERIFIED: "Verified",
  STORED: "Stored",
  RESERVED: "Reserved",
  TRANSFERRED: "Transferred",
  USED: "Used",
  EXPIRED: "Expired",
  REJECTED: "Rejected",
};

export function BloodUnitLifecycle({
  current,
  previous,
}: {
  current: BloodUnitLifecycleState;
  previous?: BloodUnitLifecycleState;
}) {
  const isTerminal = terminalStates.includes(current);
  const activeIndex = lifecycleOrder.indexOf(current);

  return (
    <div className="space-y-4">
      {previous && (
        <p className="text-xs text-muted-foreground">
          Previous status: <span className="font-mono text-foreground">{labels[previous]}</span>
        </p>
      )}
      {isTerminal ? (
        <div className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-3 py-2 text-sm font-medium text-accent">
          <Circle size={16} weight="fill" aria-hidden />
          {labels[current]}
        </div>
      ) : (
        <ol className="flex flex-wrap items-center gap-2" aria-label="Blood unit lifecycle">
          {lifecycleOrder.map((state, index) => {
            const complete = index < activeIndex;
            const active = index === activeIndex;
            return (
              <li key={state} className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 border px-2 py-1 text-[10px] font-medium uppercase tracking-wider",
                    complete && "border-green-800 bg-green-950/40 text-green-400",
                    active && "border-accent bg-accent/10 text-accent",
                    !complete && !active && "border-border text-muted-foreground"
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {complete ? (
                    <CheckCircle size={14} weight="fill" aria-hidden />
                  ) : (
                    <Circle size={14} weight={active ? "fill" : "regular"} aria-hidden />
                  )}
                  {labels[state]}
                </span>
                {index < lifecycleOrder.length - 1 && (
                  <ArrowRight size={12} className="text-muted-foreground" aria-hidden />
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
