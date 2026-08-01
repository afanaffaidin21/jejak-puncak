"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";

import { updateProfilePreferencesAction } from "@/app/profile/actions";
import { FormFeedback } from "@/components/profile/form-feedback";
import { StickySaveAction } from "@/components/profile/sticky-save-action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trackEvent } from "@/lib/analytics";
import {
  profilePreferencesSchema,
  type ProfilePreferencesValues,
} from "@/lib/profile-validation";
import type {
  FinderExperience,
  FinderGoal,
  FinderRegion,
} from "@/types/finder";
import type { MeasurementUnit, ProfileData } from "@/types/profile";

const REGION_OPTIONS: Array<{ label: string; value: FinderRegion }> = [
  { label: "Bebas", value: "anywhere" },
  { label: "Jawa", value: "jawa" },
  { label: "Sumatera", value: "sumatera" },
  { label: "Bali & Nusa Tenggara", value: "bali-nusa-tenggara" },
  { label: "Kalimantan", value: "kalimantan" },
  { label: "Sulawesi", value: "sulawesi" },
];

const EXPERIENCE_OPTIONS: Array<{
  label: string;
  value: FinderExperience | "not-set";
}> = [
  { label: "Belum ditentukan", value: "not-set" },
  { label: "Pemula", value: "beginner" },
  { label: "Menengah", value: "intermediate" },
  { label: "Berpengalaman", value: "advanced" },
];

const GOAL_OPTIONS: Array<{
  description: string;
  label: string;
  value: FinderGoal;
}> = [
  {
    description: "Mengejar momen matahari terbit.",
    label: "Sunrise",
    value: "sunrise",
  },
  {
    description: "Menyiapkan pendakian pertama.",
    label: "Puncak pertama",
    value: "first-summit",
  },
  {
    description: "Mencari medan yang menantang.",
    label: "Tantangan",
    value: "challenge",
  },
  {
    description: "Mengabadikan lanskap gunung.",
    label: "Fotografi",
    value: "photography",
  },
  {
    description: "Menikmati alam dengan tenang.",
    label: "Alam",
    value: "nature",
  },
];

export function PreferencesForm({ profile }: { profile: ProfileData }) {
  const [feedback, setFeedback] = useState<{
    message: string;
    status: "error" | "success" | null;
  }>({ message: "", status: null });
  const {
    control,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<ProfilePreferencesValues>({
    defaultValues: {
      experienceLevel: profile.experienceLevel,
      hikingGoals: profile.hikingGoals,
      measurementUnit: profile.measurementUnit,
      preferredRegion: profile.preferredRegion,
    },
    mode: "onChange",
    resolver: zodResolver(profilePreferencesSchema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setFeedback({ message: "", status: null });
    try {
      const result = await updateProfilePreferencesAction(values);
      if (!result.success) {
        setFeedback({ message: result.message, status: "error" });
        return;
      }

      reset(values);
      trackEvent("preference_updated");
      setFeedback({
        message: "Preferensi pendakian berhasil diperbarui.",
        status: "success",
      });
    } catch {
      setFeedback({
        message: "Perubahan tidak dapat disimpan.",
        status: "error",
      });
    }
  });

  return (
    <form className="flex flex-col gap-md" noValidate onSubmit={onSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Preferensi pendakian</CardTitle>
          <CardDescription>
            Pilihan ini membantu Jejak Puncak memberi konteks yang lebih
            relevan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Controller
              control={control}
              name="preferredRegion"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="preferred-region">
                    Wilayah pilihan
                  </FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value as FinderRegion)
                    }
                    value={field.value}
                  >
                    <SelectTrigger
                      className="h-touch w-full"
                      id="preferred-region"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REGION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              control={control}
              name="experienceLevel"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="experience-level">
                    Tingkat pengalaman
                  </FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(
                        value === "not-set"
                          ? null
                          : (value as FinderExperience),
                      )
                    }
                    value={field.value ?? "not-set"}
                  >
                    <SelectTrigger
                      className="h-touch w-full"
                      id="experience-level"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            <Controller
              control={control}
              name="hikingGoals"
              render={({ field }) => (
                <FieldSet
                  data-invalid={errors.hikingGoals ? "true" : undefined}
                >
                  <FieldLegend>Tujuan pendakian</FieldLegend>
                  <FieldDescription>Pilih hingga tiga tujuan.</FieldDescription>
                  <div
                    className="grid gap-xs sm:grid-cols-2"
                    data-slot="checkbox-group"
                  >
                    {GOAL_OPTIONS.map((option) => {
                      const checked = field.value.includes(option.value);
                      return (
                        <Field key={option.value} orientation="horizontal">
                          <Checkbox
                            checked={checked}
                            id={`goal-${option.value}`}
                            onCheckedChange={(nextChecked) => {
                              const next = nextChecked
                                ? [...field.value, option.value]
                                : field.value.filter(
                                    (goal) => goal !== option.value,
                                  );
                              field.onChange(next);
                            }}
                          />
                          <FieldLabel htmlFor={`goal-${option.value}`}>
                            <Field>
                              <span className="font-medium">
                                {option.label}
                              </span>
                              <span className="text-caption font-normal text-text-muted">
                                {option.description}
                              </span>
                            </Field>
                          </FieldLabel>
                        </Field>
                      );
                    })}
                  </div>
                  <FieldError>{errors.hikingGoals?.message}</FieldError>
                </FieldSet>
              )}
            />

            <Controller
              control={control}
              name="measurementUnit"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="measurement-unit">
                    Satuan pengukuran
                  </FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      field.onChange(value as MeasurementUnit)
                    }
                    value={field.value}
                  >
                    <SelectTrigger
                      className="h-touch w-full"
                      id="measurement-unit"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">
                        Metrik (meter, kilometer)
                      </SelectItem>
                      <SelectItem value="imperial">
                        Imperial (feet, mile)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-md">
            <FormFeedback {...feedback} />
          </div>
        </CardContent>
      </Card>
      <StickySaveAction disabled={!isDirty} isLoading={isSubmitting} />
    </form>
  );
}
