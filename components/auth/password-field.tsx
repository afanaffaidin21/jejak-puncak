"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

type PasswordFieldProps = React.ComponentProps<"input"> & {
  description?: string;
  error?: string;
  label: string;
};

export function PasswordField({
  description,
  error,
  id,
  label,
  required,
  ...props
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = error && id ? `${id}-error` : undefined;
  const descriptionId = description && id ? `${id}-description` : undefined;
  const describedBy = [props["aria-describedby"], descriptionId, errorId]
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
      <InputGroup>
        <InputGroupInput
          {...props}
          aria-describedby={describedBy || undefined}
          aria-invalid={error ? true : undefined}
          id={id}
          required={required}
          type={isVisible ? "text" : "password"}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={
              isVisible ? "Sembunyikan password" : "Tampilkan password"
            }
            aria-pressed={isVisible}
            onClick={() => setIsVisible((current) => !current)}
            title={isVisible ? "Sembunyikan password" : "Tampilkan password"}
          >
            {isVisible ? (
              <EyeOff aria-hidden="true" />
            ) : (
              <Eye aria-hidden="true" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      {description ? (
        <FieldDescription id={descriptionId}>{description}</FieldDescription>
      ) : null}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </Field>
  );
}
