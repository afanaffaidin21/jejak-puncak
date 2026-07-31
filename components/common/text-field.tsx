import type { ComponentProps } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type TextFieldProps = Omit<
  ComponentProps<typeof Input>,
  "autoComplete" | "id" | "name"
> & {
  autoComplete: NonNullable<ComponentProps<typeof Input>["autoComplete"]>;
  description?: string;
  error?: string;
  id: string;
  label: string;
  name: string;
};

export function TextField({
  autoComplete,
  description,
  error,
  id,
  label,
  name,
  required,
  ...inputProps
}: TextFieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [inputProps["aria-describedby"], descriptionId, errorId]
    .filter(Boolean)
    .join(" ");

  return (
    <Field data-invalid={error ? "true" : undefined}>
      <FieldLabel htmlFor={id}>
        {label}
        {required ? (
          <>
            <span aria-hidden="true" className="text-danger">
              *
            </span>
            <span className="sr-only">(wajib)</span>
          </>
        ) : null}
      </FieldLabel>
      <Input
        {...inputProps}
        autoComplete={autoComplete}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        id={id}
        name={name}
        required={required}
      />
      {description ? (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </Field>
  );
}
