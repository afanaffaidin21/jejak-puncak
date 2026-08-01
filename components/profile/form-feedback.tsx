import { CheckCircle2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";

export function FormFeedback({
  message,
  status,
}: {
  message: string;
  status: "error" | "success" | null;
}) {
  if (!message || !status) return null;

  return (
    <Alert
      aria-live={status === "success" ? "polite" : undefined}
      role={status === "error" ? "alert" : "status"}
      variant={status === "error" ? "destructive" : "default"}
    >
      {status === "success" ? <CheckCircle2 aria-hidden="true" /> : null}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
}
