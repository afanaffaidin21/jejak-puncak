import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

type ErrorStateProps = {
  action?: ReactNode;
  className?: string;
  description: string;
  title?: string;
};

export function ErrorState({
  action,
  className,
  description,
  title = "Terjadi kendala",
}: ErrorStateProps) {
  return (
    <Alert className={cn("border-danger/30", className)} variant="destructive">
      <CircleAlert aria-hidden="true" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>
        <p>{description}</p>
        {action ? <div className="mt-sm">{action}</div> : null}
      </AlertDescription>
    </Alert>
  );
}
